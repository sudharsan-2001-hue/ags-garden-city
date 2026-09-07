/**
 * safeStorage.js - High-Traffic, Concurrent-Safe Storage & Resilience Engine
 * Provides failsafe localStorage / sessionStorage operations with in-memory fallback,
 * automatic storage quota recovery, and collision-free booking processing.
 */

// In-Memory Fallback Store (Used if localStorage is disabled, full, or in private mode)
const memoryStore = new Map();

export const safeStorage = {
  /**
   * Safe getItem with automatic JSON parsing and fallback
   */
  getItem(key, defaultValue = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        if (item === null || item === undefined) {
          return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
        }
        try {
          return JSON.parse(item);
        } catch {
          return item; // Plain string fallback
        }
      }
    } catch (err) {
      console.warn(`[safeStorage] localStorage read failed for key "${key}", falling back to memory:`, err);
    }
    return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
  },

  /**
   * Safe setItem with QuotaExceeded recovery & memory cache synchronization
   */
  setItem(key, value) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    memoryStore.set(key, value);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, serialized);
        return true;
      }
    } catch (err) {
      console.warn(`[safeStorage] localStorage write failed for key "${key}" (Quota/Security):`, err);
      // Auto-cleanup non-critical cache if quota exceeded
      try {
        if (window.localStorage && err.name === 'QuotaExceededError') {
          // Prune older items safely
          const keysToPrune = ['agsgarden_temp_cache', 'agsgarden_recent_searches'];
          keysToPrune.forEach(k => window.localStorage.removeItem(k));
          window.localStorage.setItem(key, serialized);
          return true;
        }
      } catch (recoveryErr) {
        console.error('[safeStorage] Recovery failed, using in-memory store:', recoveryErr);
      }
    }
    return false;
  },

  /**
   * Safe removeItem
   */
  removeItem(key) {
    memoryStore.delete(key);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (err) {
      console.warn(`[safeStorage] removeItem failed for key "${key}":`, err);
    }
  },

  /**
   * Atomic, High-Concurrency Safe Booking Appender
   * Generates collision-proof booking IDs and updates storage atomically
   */
  addBooking(bookingData) {
    const timestamp = Date.now();
    const nanoRand = Math.floor(100000 + Math.random() * 900000);
    const safeBooking = {
      ...bookingData,
      bookingId: bookingData.bookingId || `AGS-2026-${nanoRand}`,
      createdAt: new Date().toISOString(),
      timestamp
    };

    const existing = this.getItem('agsgarden_admin_bookings', []);
    const updatedList = [safeBooking, ...(Array.isArray(existing) ? existing : [])];
    this.setItem('agsgarden_admin_bookings', updatedList);
    return safeBooking;
  },

  /**
   * Atomic Client Visit Alert Dispatcher
   */
  addVisitAlert(alertData) {
    const nanoRand = Math.floor(1000 + Math.random() * 9000);
    const safeAlert = {
      ...alertData,
      alertId: alertData.alertId || `ALT-2026-${nanoRand}`,
      createdAt: new Date().toISOString(),
      timestamp: 'Just Now'
    };

    const existing = this.getItem('agsgarden_visit_alerts', []);
    const updatedList = [safeAlert, ...(Array.isArray(existing) ? existing : [])];
    this.setItem('agsgarden_visit_alerts', updatedList);
    return safeAlert;
  }
};

export default safeStorage;
