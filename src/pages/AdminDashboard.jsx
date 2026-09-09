import React, { useState, useEffect } from 'react';
import Propertycard from '../components/Propertycard';
import { PROPERTIES_DATA } from '../data/propertiesData';
import { API_ENDPOINTS } from '../utils/api';
import { AGS_LOGO_BASE64 } from '../assets/agsLogoBase64';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Printer, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Eye, 
  X, 
  PlusCircle, 
  FileText, 
  UserCheck, 
  Building2,
  TrendingUp,
  Image as ImageIcon,
  Upload,
  Tag,
  Flame,
  Gift,
  Edit3,
  Check,
  ArrowRight,
  CreditCard,
  Banknote,
  Smartphone,
  AlertCircle,
  CheckCheck,
  Bell,
  Car,
  MessageSquare,
  PhoneCall,
  User,
  Zap,
  Lock,
  Key,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import safeStorage from '../utils/safeStorage';

const INITIAL_BOOKINGS = [
  {
    bookingId: 'AGS-2026-8941',
    propertyId: 1,
    propertyTitle: 'Emerald Luxe 3 BHK Residence',
    propertyLocation: 'Anna Nagar West, Chennai',
    propertyPrice: '₹1,25,00,000',
    tokenPaid: 25000,
    paymentMethod: 'Razorpay (UPI - GPay)',
    paymentGateway: 'Razorpay',
    paymentStatus: 'PAID / VERIFIED',
    buyerName: 'Ramesh Kumar S',
    buyerPhone: '+91 98401 23456',
    buyerEmail: 'ramesh.k@example.com',
    visitDate: '2026-09-03',
    timeSlot: '10:00 AM - 11:30 AM',
    transactionId: 'pay_rzp_9841ad02',
    date: '31 Aug 2026, 10:15 PM',
    assignedManager: 'Karthik Raja (Senior RM)',
    managerContact: '+91 94444 88822',
    status: 'CONFIRMED'
  },
  {
    bookingId: 'AGS-2026-8942',
    propertyId: 2,
    propertyTitle: 'Azure Bay Sea View Luxury Villa',
    propertyLocation: 'ECR Coastal Corridor, Chennai',
    propertyPrice: '₹2,80,00,000',
    tokenPaid: 50000,
    paymentMethod: 'Razorpay (Credit Card)',
    paymentGateway: 'Razorpay',
    paymentStatus: 'PAID / VERIFIED',
    buyerName: 'Priya Sundaram',
    buyerPhone: '+91 99620 98765',
    buyerEmail: 'priya.sundar@example.com',
    visitDate: '2026-09-04',
    timeSlot: '02:00 PM - 03:30 PM',
    transactionId: 'pay_rzp_7749bc11',
    date: '31 Aug 2026, 09:30 PM',
    assignedManager: 'Divya Prakash (VIP RM)',
    managerContact: '+91 98840 11223',
    status: 'INSPECTION SCHEDULED'
  },
  {
    bookingId: 'AGS-2026-8943',
    propertyId: 3,
    propertyTitle: 'Cyber Horizon 2 BHK Smart Flat',
    propertyLocation: 'OMR IT Expressway, Chennai',
    propertyPrice: '₹78,00,000',
    tokenPaid: 20000,
    paymentMethod: 'Cash on Site Visit',
    paymentGateway: 'Cash on Hand',
    paymentStatus: 'SCHEDULED (Pay at Inspection)',
    buyerName: 'Senthil Nathan M',
    buyerPhone: '+91 97890 54321',
    buyerEmail: 'senthil.tech@example.com',
    visitDate: '2026-09-05',
    timeSlot: '05:00 PM - 06:30 PM',
    transactionId: 'N/A (Cash on Visit)',
    date: '31 Aug 2026, 08:45 PM',
    assignedManager: 'Anand Kumar (OMR Specialist)',
    managerContact: '+91 97711 33445',
    status: 'PENDING INSPECTION'
  },
  {
    bookingId: 'AGS-2026-8944',
    propertyId: 4,
    propertyTitle: 'Grand Horizon Duplex Penthouse',
    propertyLocation: 'Velachery Bypass, Chennai',
    propertyPrice: '₹1,95,00,000',
    tokenPaid: 40000,
    paymentMethod: 'Razorpay (Net Banking - HDFC)',
    paymentGateway: 'Razorpay',
    paymentStatus: 'PAID / VERIFIED',
    buyerName: 'Rajesh Balaji',
    buyerPhone: '+91 98841 87654',
    buyerEmail: 'rajesh.b@enterprise.com',
    visitDate: '2026-09-02',
    timeSlot: '11:30 AM - 01:00 PM',
    transactionId: 'pay_rzp_3321ef88',
    date: '30 Aug 2026, 06:20 PM',
    assignedManager: 'Karthik Raja (Senior RM)',
    managerContact: '+91 94444 88822',
    status: 'COMPLETED'
  },
  {
    bookingId: 'AGS-2026-8945',
    propertyId: 5,
    propertyTitle: 'Serene Green Gated Community Villa',
    propertyLocation: 'Tambaram East, Chennai',
    propertyPrice: '₹1,45,00,000',
    tokenPaid: 30000,
    paymentMethod: 'Cash on Site Visit',
    paymentGateway: 'Cash on Hand',
    paymentStatus: 'PENDING INSPECTION (Collect at Site)',
    buyerName: 'Manojkumar D',
    buyerPhone: '+91 94433 22110',
    buyerEmail: 'manoj.d@example.com',
    visitDate: '2026-09-06',
    timeSlot: '10:00 AM - 11:30 AM',
    transactionId: 'N/A (Cash on Visit)',
    date: '30 Aug 2026, 04:10 PM',
    assignedManager: 'Anand Kumar (OMR Specialist)',
    managerContact: '+91 97711 33445',
    status: 'PENDING INSPECTION'
  }
];

const INITIAL_VISIT_ALERTS = [
  {
    alertId: 'ALT-2026-901',
    customerName: 'Naren Karthik',
    customerPhone: '+91 98402 33445',
    customerEmail: 'naren234@gmail.com',
    apartmentTitle: 'Emerald Luxe 3 BHK Residence',
    apartmentLocation: 'Anna Nagar West, Chennai',
    apartmentPrice: '₹1,25,00,000',
    visitDate: 'Today (01 Sep 2026)',
    timeSlot: '04:30 PM - 05:30 PM',
    status: '🔴 URGENT - TODAY VISIT',
    statusType: 'urgent',
    notes: 'Looking for 3 BHK high floor with 2 covered car parks. Needs chauffeur cab pickup from Anna Nagar Roundtana.',
    timestamp: 'Just Now (2 mins ago)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    cabRequested: true
  },
  {
    alertId: 'ALT-2026-902',
    customerName: 'Priya Sundaram',
    customerPhone: '+91 99620 98765',
    customerEmail: 'priya.sundar@example.com',
    apartmentTitle: 'Azure Bay Sea View Luxury Villa',
    apartmentLocation: 'ECR Coastal Corridor, Chennai',
    apartmentPrice: '₹2,80,00,000',
    visitDate: 'Tomorrow (02 Sep 2026)',
    timeSlot: '11:00 AM - 12:30 PM',
    status: '🔵 TOMORROW SCHEDULED',
    statusType: 'scheduled',
    notes: 'Beachfront villa family inspection. Requested Senior Relationship Manager on site.',
    timestamp: '25 mins ago',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    cabRequested: true
  },
  {
    alertId: 'ALT-2026-903',
    customerName: 'Senthil Nathan M',
    customerPhone: '+91 97890 54321',
    customerEmail: 'senthil.tech@example.com',
    apartmentTitle: 'Cyber Horizon 2 BHK Smart Flat',
    apartmentLocation: 'OMR IT Expressway, Chennai',
    apartmentPrice: '₹78,00,000',
    visitDate: '03 Sep 2026',
    timeSlot: '05:00 PM - 06:30 PM',
    status: '🟡 UPCOMING VISIT',
    statusType: 'upcoming',
    notes: 'Near SIPCOT Siruseri tech corridor. Inquiring about festive ₹50,000 token discount.',
    timestamp: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    cabRequested: false
  },
  {
    alertId: 'ALT-2026-904',
    customerName: 'Rajesh Balaji',
    customerPhone: '+91 98841 87654',
    customerEmail: 'rajesh.b@enterprise.com',
    apartmentTitle: 'Grand Horizon Duplex Penthouse',
    apartmentLocation: 'Velachery Bypass, Chennai',
    apartmentPrice: '₹1,95,00,000',
    visitDate: '04 Sep 2026',
    timeSlot: '02:00 PM - 03:30 PM',
    status: '🟡 UPCOMING VISIT',
    statusType: 'upcoming',
    notes: 'Terrace garden penthouse inspection. Ready with token payment.',
    timestamp: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    cabRequested: true
  }
];

function AdminDashboard({ 
  bookings = [], 
  onUpdateBookings, 
  propertiesList = PROPERTIES_DATA, 
  onUpdateProperties,
  onLogoutAdmin 
}) {
  // 'hub' (Real Estate Modular Cards Grid), 'visit_alerts', 'bookings', 'properties_manager', 'change_password', 'view_replies', 'payments'
  const [activeTab, setActiveTab] = useState('hub'); 

  // Security Passcode Change State
  const [passcodeForm, setPasscodeForm] = useState({
    currentPasscode: '',
    newPasscode: '',
    confirmPasscode: '',
    clearanceKey: ''
  });
  const [passcodeMsg, setPasscodeMsg] = useState({ text: '', type: '' });

  const handlePasscodeUpdate = (e) => {
    e.preventDefault();
    if (passcodeForm.newPasscode !== passcodeForm.confirmPasscode) {
      setPasscodeMsg({ text: 'New Passcode and Confirm Passcode do not match!', type: 'error' });
      return;
    }
    if (passcodeForm.clearanceKey.trim() !== 'AGS2026') {
      setPasscodeMsg({ text: 'Invalid Master Clearance Key! Must be AGS2026', type: 'error' });
      return;
    }
    safeStorage.setItem('agsgarden_admin_passcode', passcodeForm.newPasscode.trim());
    setPasscodeMsg({ text: 'Admin Security Passcode successfully updated to new credentials!', type: 'success' });
    setPasscodeForm({ currentPasscode: '', newPasscode: '', confirmPasscode: '', clearanceKey: '' });
  };

  // Customer Replies & Feedback State
  const [repliesList, setRepliesList] = useState(() => {
    const saved = safeStorage.getItem('agsgarden_admin_replies', null);
    if (saved && Array.isArray(saved)) return saved;
    return [
      {
        id: 'REP-101',
        customerName: 'Senthil Nathan (OMR)',
        customerPhone: '+91 97890 54321',
        subject: 'Floor Plan & CMDA Document Request (Cyber Horizon)',
        message: 'Requesting verified Patta and CMDA approval copy for 2 BHK flat.',
        reply: 'Verified documents dispatched to your WhatsApp and email. Senior RM assigned for Saturday inspection.',
        status: 'Resolved & Dispatched',
        date: '02 Sep 2026, 02:30 PM'
      },
      {
        id: 'REP-102',
        customerName: 'Priya Sundaram (ECR)',
        customerPhone: '+91 99620 98765',
        subject: 'Site Inspection Cab Reschedule Request',
        message: 'Can we reschedule Saturday cab pickup to 11:30 AM from Anna Nagar?',
        reply: 'Cab rescheduled to 11:30 AM. Chauffeur contact details dispatched.',
        status: 'Resolved & Dispatched',
        date: '02 Sep 2026, 11:15 AM'
      },
      {
        id: 'REP-103',
        customerName: 'Ramesh Kumar (Anna Nagar)',
        customerPhone: '+91 98401 23456',
        subject: 'Token Payment Invoice Confirmation',
        message: 'Need official GST tax invoice copy for Emerald Luxe 3 BHK booking token.',
        reply: 'Official verified GST tax invoice generated with reference AGS-2026-8941 and sent to email.',
        status: 'Resolved & Dispatched',
        date: '01 Sep 2026, 05:40 PM'
      }
    ];
  });

  const [newReplyForm, setNewReplyForm] = useState({
    customerName: '',
    customerPhone: '',
    subject: '',
    message: '',
    replyText: ''
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!newReplyForm.customerName || !newReplyForm.replyText) return;
    const newEntry = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      customerName: newReplyForm.customerName,
      customerPhone: newReplyForm.customerPhone || '+91 73971 35792',
      subject: newReplyForm.subject || 'General Property Inquiry',
      message: newReplyForm.message || 'Direct customer request via web portal',
      reply: newReplyForm.replyText,
      status: 'Resolved & Dispatched',
      date: new Date().toLocaleString()
    };
    const updated = [newEntry, ...repliesList];
    setRepliesList(updated);
    safeStorage.setItem('agsgarden_admin_replies', updated);
    setNewReplyForm({ customerName: '', customerPhone: '', subject: '', message: '', replyText: '' });
    alert('Reply and notification dispatched to customer!');
  };

  // Live Client Visit Alerts state (Concurrency-Safe)
  const [visitAlerts, setVisitAlerts] = useState(() => {
    const saved = safeStorage.getItem('agsgarden_visit_alerts', null);
    if (saved && Array.isArray(saved)) {
      return [...saved, ...INITIAL_VISIT_ALERTS.filter(ia => !saved.some(p => p.alertId === ia.alertId))];
    }
    return INITIAL_VISIT_ALERTS;
  });

  const syncVisitAlerts = (updated) => {
    setVisitAlerts(updated);
    safeStorage.setItem('agsgarden_visit_alerts', updated);
  };

  const handleDismissAlert = (alertId) => {
    const updated = visitAlerts.filter(a => a.alertId !== alertId);
    syncVisitAlerts(updated);
  };

  const handleConfirmVisit = (alertId) => {
    const updated = visitAlerts.map(a => a.alertId === alertId ? { ...a, status: '✅ VISIT CONFIRMED', statusType: 'confirmed' } : a);
    syncVisitAlerts(updated);
  };

  const handleDispatchCab = (alertId) => {
    const updated = visitAlerts.map(a => a.alertId === alertId ? { ...a, cabDispatched: true, status: '🚗 CHAUFFEUR CAB DISPATCHED', statusType: 'cab_dispatched' } : a);
    syncVisitAlerts(updated);
    alert('VIP Chauffeur Cab booked and tracking SMS sent to client!');
  };

  // Sub-view status filter: 'ALL', 'CONFIRMED', 'INSPECTION_SCHEDULED', 'PENDING_INSPECTION', 'COMPLETED', 'RAZORPAY_STATUS', 'CASH_STATUS'
  const [activeStatusSubView, setActiveStatusSubView] = useState('ALL');

  // Bookings state (Concurrency-Safe)
  const [allBookings, setAllBookings] = useState(() => {
    const saved = safeStorage.getItem('agsgarden_admin_bookings', null);
    if (saved && Array.isArray(saved)) {
      return [...saved, ...INITIAL_BOOKINGS.filter(ib => !saved.some(p => p.bookingId === ib.bookingId))];
    }
    return INITIAL_BOOKINGS;
  });

  // Properties state (Concurrency-Safe)
  const [adminProperties, setAdminProperties] = useState(() => {
    const saved = safeStorage.getItem('agsgarden_custom_properties', null);
    if (saved && Array.isArray(saved)) {
      return saved;
    }
    return PROPERTIES_DATA;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookingForView, setSelectedBookingForView] = useState(null);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  // Manage dossier-modal-active class on body for clean print view
  useEffect(() => {
    if (selectedBookingForView) {
      document.body.classList.add('dossier-modal-active');
    } else {
      document.body.classList.remove('dossier-modal-active');
    }
    return () => {
      document.body.classList.remove('dossier-modal-active');
    };
  }, [selectedBookingForView]);

  // Property Editor Modal & Live Preview
  const [editingProperty, setEditingProperty] = useState(null);
  const [previewProperty, setPreviewProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);

  // Form state for creating / editing a property
  const [propertyForm, setPropertyForm] = useState({
    id: null,
    title: '',
    type: 'Apartment',
    category: 'apartment',
    location: 'Anna Nagar, Chennai',
    beds: 3,
    baths: 3,
    sqft: '1,500',
    originalPrice: '₹1,40,00,000',
    offerPrice: '₹1,25,00,000',
    priceVal: 12500000,
    tokenAmount: 25000,
    offerNote: '🎉 FESTIVE SPECIAL: Save ₹15 Lakhs + Free Modular Kitchen + 0% Stamp Duty!',
    offerDiscount: '11% OFF',
    badge: 'SPECIAL OFFER',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Luxury residence with premium fittings, large balcony, and direct club access.'
  });

  const syncBookings = (updated) => {
    setAllBookings(updated);
    localStorage.setItem('agsgarden_admin_bookings', JSON.stringify(updated));
    if (onUpdateBookings) onUpdateBookings(updated);
  };

  const syncProperties = (updated) => {
    setAdminProperties(updated);
    localStorage.setItem('agsgarden_custom_properties', JSON.stringify(updated));
    if (onUpdateProperties) onUpdateProperties(updated);
  };

  const [dbLoading, setDbLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState('Connected to MongoDB (realestate)');

  const fetchBackendProperties = async () => {
    try {
      setDbLoading(true);
      const res = await fetch(API_ENDPOINTS.PROPERTIES);
      if (res.ok) {
        const data = await res.json();
        const rawList = Array.isArray(data) ? data : (data.properties || data.data || []);
        if (rawList && rawList.length > 0) {
          const normalized = rawList.map((p, idx) => {
            const priceNum = typeof p.price === 'number' 
              ? p.price 
              : (p.priceVal || Number(String(p.price).replace(/[^0-9]/g, '')) || 0);
            const type = p.propertyType || p.type || 'Apartment';
            const areaNum = p.area || p.sqft || 1200;
            return {
              ...p,
              id: p._id || p.id || `prop-${idx}`,
              _id: p._id || p.id || `prop-${idx}`,
              type: type,
              propertyType: type,
              category: p.category || (type.toLowerCase().includes('villa') ? 'villa' : 'apartment'),
              beds: p.bhk || p.beds || 2,
              baths: p.baths || p.bhk || 2,
              sqft: String(areaNum),
              area: String(areaNum),
              priceVal: priceNum,
              price: typeof p.price === 'string' && p.price.includes('₹') ? p.price : `₹${priceNum.toLocaleString('en-IN')}`,
              originalPrice: p.originalPrice || (typeof p.price === 'string' && p.price.includes('₹') ? p.price : `₹${priceNum.toLocaleString('en-IN')}`),
              offerPrice: p.offerPrice || (typeof p.price === 'string' && p.price.includes('₹') ? p.price : `₹${priceNum.toLocaleString('en-IN')}`),
              tokenAmount: p.tokenAmount || Math.round(priceNum * 0.005) || 25000,
              image: p.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
              gallery: (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'],
              status: p.status || 'For Sale',
              badge: p.badge || 'VERIFIED',
              offerNote: p.offerNote || 'Direct Developer Verified Deal'
            };
          });
          setAdminProperties(normalized);
          safeStorage.setItem('agsgarden_custom_properties', normalized);
          setDbStatus(`Live: ${normalized.length} properties fetched from MongoDB (realestate)`);
        }
      }
    } catch (err) {
      console.warn('Backend fetch for Admin properties:', err);
      setDbStatus('MongoDB offline / local fallback');
    } finally {
      setDbLoading(false);
    }
  };

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchRegisteredUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await fetch(API_ENDPOINTS.AUTH_USERS);
      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setRegisteredUsers(data.users);
        }
      }
    } catch (err) {
      console.warn('Backend fetch for registered users:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to remove this user from Real Estate database?')) {
      try {
        await fetch(`${API_ENDPOINTS.AUTH_USERS}/${userId}`, { method: 'DELETE' });
        setRegisteredUsers(prev => prev.filter(u => u._id !== userId));
      } catch (err) {
        console.warn('User delete error:', err);
      }
    }
  };

  const fetchBackendBookings = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.BOOKINGS);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAllBookings(data);
          safeStorage.setItem('agsgarden_admin_bookings', data);
        }
      }
    } catch (err) {
      console.warn('Backend bookings fetch:', err);
    }
  };

  const fetchBackendInquiries = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.INQUIRIES);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setVisitAlerts(data);
          safeStorage.setItem('agsgarden_visit_alerts', data);
        }
      }
    } catch (err) {
      console.warn('Backend inquiries fetch:', err);
    }
  };

  useEffect(() => {
    fetchBackendProperties();
    fetchRegisteredUsers();
    fetchBackendBookings();
    fetchBackendInquiries();
  }, []);

  const handleStatusChange = (bookingId, newStatus) => {
    const updated = allBookings.map(b => b.bookingId === bookingId ? { ...b, status: newStatus } : b);
    syncBookings(updated);
  };

  const handleMarkCashCollected = (bookingId) => {
    const updated = allBookings.map(b => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          paymentStatus: 'PAID & COLLECTED (Receipt Issued)',
          status: 'COMPLETED'
        };
      }
      return b;
    });
    syncBookings(updated);
    alert(`Cash Token for ${bookingId} marked as COLLECTED and status updated to COMPLETED!`);
  };

  // Image Upload handler via FileReader
  const handleImageFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        setPropertyForm((prev) => ({
          ...prev,
          image: prev.gallery.length === 0 ? base64Url : prev.image,
          gallery: [...prev.gallery, base64Url]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveGalleryImage = (idxToRemove) => {
    setPropertyForm((prev) => {
      const updatedGallery = prev.gallery.filter((_, idx) => idx !== idxToRemove);
      return {
        ...prev,
        gallery: updatedGallery,
        image: updatedGallery[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'
      };
    });
  };

  const handleOpenNewPropertyModal = () => {
    setPropertyForm({
      id: Date.now(),
      title: '',
      type: 'Apartment',
      category: 'apartment',
      location: 'Anna Nagar West, Chennai',
      beds: 3,
      baths: 3,
      sqft: '1,550',
      price: '₹1,25,00,000',
      originalPrice: '₹1,40,00,000',
      offerPrice: '₹1,25,00,000',
      priceVal: 12500000,
      tokenAmount: 25000,
      pricePerSqft: '₹8,060/sq.ft',
      offerNote: '🎉 MEGA OFFER: Save ₹15 Lakhs + Free 2-Year Maintenance + 0% Stamp Duty!',
      offerDiscount: '11% OFF',
      badge: 'HOT DEAL',
      status: 'For Sale',
      verified: true,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80'
      ],
      description: 'Ultra-luxurious residence featuring spacious interiors, imported marble, and top-tier amenities.'
    });
    setEditingProperty(null);
    setShowPropertyModal(true);
  };

  const handleEditProperty = (prop) => {
    setPropertyForm({
      ...prop,
      originalPrice: prop.originalPrice || prop.price,
      offerPrice: prop.offerPrice || prop.price,
      offerNote: prop.offerNote || '🎉 SPECIAL OFFER: Exclusive Direct Developer Discount Available!',
      offerDiscount: prop.offerDiscount || '10% OFF',
      gallery: prop.gallery || [prop.image]
    });
    setEditingProperty(prop);
    setShowPropertyModal(true);
  };

  const handleSavePropertyForm = async (e) => {
    e.preventDefault();
    const finalProp = {
      ...propertyForm,
      price: propertyForm.offerPrice || propertyForm.originalPrice || '₹1,25,00,000',
      priceVal: Number(String(propertyForm.offerPrice || propertyForm.price).replace(/[^0-9]/g, '')) || 12500000,
      image: propertyForm.gallery[0] || propertyForm.image
    };

    let updatedList;
    if (editingProperty) {
      updatedList = adminProperties.map((p) => p.id === editingProperty.id ? finalProp : p);
    } else {
      // Save directly to MongoDB realestate database backend
      try {
        const res = await fetch(API_ENDPOINTS.PROPERTIES, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: finalProp.title,
            price: finalProp.priceVal,
            originalPrice: finalProp.originalPrice,
            offerPrice: finalProp.offerPrice,
            offerNote: finalProp.offerNote,
            offerDiscount: finalProp.offerDiscount,
            badge: finalProp.badge || 'SPECIAL OFFER',
            location: finalProp.location,
            bhk: Number(finalProp.beds) || 2,
            area: Number(String(finalProp.sqft).replace(/[^0-9]/g, '')) || 1200,
            propertyType: finalProp.type,
            status: finalProp.status || 'For Sale',
            description: finalProp.description || '',
            image: finalProp.image,
            gallery: finalProp.gallery && finalProp.gallery.length > 0 ? finalProp.gallery : [finalProp.image]
          })
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.property && resData.property._id) {
            finalProp.id = resData.property._id;
            finalProp._id = resData.property._id;
          }
        }
      } catch (err) {
        console.warn('MongoDB backend sync:', err);
      }
      updatedList = [finalProp, ...adminProperties];
    }

    syncProperties(updatedList);
    setShowPropertyModal(false);
    alert('Property with images saved to MongoDB "realestate" database and published live!');
  };

  const handleDeleteProperty = async (propId) => {
    if (window.confirm('Are you sure you want to remove this property listing?')) {
      const updated = adminProperties.filter(p => p.id !== propId);
      syncProperties(updated);
      try {
        await fetch(`${API_ENDPOINTS.PROPERTIES}/${propId}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('MongoDB backend delete:', err);
      }
    }
  };

  // Status-specific counts
  const confirmedList = allBookings.filter(b => b.status === 'CONFIRMED');
  const scheduledList = allBookings.filter(b => b.status === 'INSPECTION SCHEDULED');
  const pendingList = allBookings.filter(b => b.status === 'PENDING INSPECTION');
  const cancelledList = allBookings.filter(b => b.status === 'CANCELLED' || b.status?.includes('CANCEL'));
  const completedList = allBookings.filter(b => b.status === 'COMPLETED');
  
  // Payment-specific lists
  const razorpayList = allBookings.filter(b => b.paymentMethod.includes('Razorpay') || b.paymentGateway === 'Razorpay');
  const cashList = allBookings.filter(b => b.paymentMethod.includes('Cash') || b.paymentGateway === 'Cash on Hand');

  const totalRevenue = allBookings.reduce((sum, b) => sum + (b.tokenPaid || 0), 0);
  const razorpayRevenue = razorpayList.reduce((sum, b) => sum + (b.tokenPaid || 0), 0);
  const cashDueTotal = cashList.reduce((sum, b) => sum + (b.tokenPaid || 0), 0);

  // Active filtered list based on sub-view tab
  let displayedBookings = allBookings;
  if (activeStatusSubView === 'CONFIRMED') displayedBookings = confirmedList;
  else if (activeStatusSubView === 'INSPECTION_SCHEDULED') displayedBookings = scheduledList;
  else if (activeStatusSubView === 'PENDING_INSPECTION') displayedBookings = pendingList;
  else if (activeStatusSubView === 'CANCELLED') displayedBookings = cancelledList;
  else if (activeStatusSubView === 'COMPLETED') displayedBookings = completedList;
  else if (activeStatusSubView === 'RAZORPAY_STATUS') displayedBookings = razorpayList;
  else if (activeStatusSubView === 'CASH_STATUS') displayedBookings = cashList;

  // Apply search query
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    displayedBookings = displayedBookings.filter(b => 
      b.buyerName?.toLowerCase().includes(term) ||
      b.buyerPhone?.toLowerCase().includes(term) ||
      b.bookingId?.toLowerCase().includes(term) ||
      b.propertyTitle?.toLowerCase().includes(term)
    );
  }

  return (
    <div className="section-wrapper" style={{ maxWidth: '1360px', margin: '0 auto', textAlign: 'left', padding: '40px 20px 80px' }}>
      
      {/* Top Header */}
      <div className="section-top-header" style={{ marginBottom: '24px' }}>
        <div className="section-title-group">
          <span className="section-tag" style={{ color: '#10b981' }}>
            <ShieldCheck size={14} /> AGS GARDEN CITY CENTRAL ADMIN CONTROL
          </span>
          <h1 className="section-main-heading" style={{ fontSize: '34px' }}>
            Admin Dashboard & <span className="gradient-text">Management Hub</span>
          </h1>
          <p className="section-subtext">
            Modular Real Estate control center with separate views for Properties, Orders, Security, Enquiries & Customer Replies.
          </p>
        </div>

        {/* Top Main Tab Switcher & Logout */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Hub Overview Button */}
          <button 
            className={`glass-btn ${activeTab === 'hub' ? '' : 'glass-btn-secondary'}`}
            style={{
              background: activeTab === 'hub' 
                ? 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)' 
                : 'rgba(255, 255, 255, 0.05)',
              fontWeight: 800
            }}
            onClick={() => setActiveTab('hub')}
          >
            🎛️ Control Hub
          </button>

          {/* 👥 Real Estate Registered Users Tab */}
          <button 
            className={`glass-btn ${activeTab === 'registered_users' ? '' : 'glass-btn-secondary'}`}
            style={{
              background: activeTab === 'registered_users' 
                ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' 
                : 'rgba(168, 85, 247, 0.15)',
              border: activeTab === 'registered_users' ? '1px solid #a855f7' : '1px solid rgba(168, 85, 247, 0.4)',
              color: '#fff',
              fontWeight: 800
            }}
            onClick={() => {
              setActiveTab('registered_users');
              fetchRegisteredUsers();
            }}
          >
            <Users size={15} /> Registered Users ({registeredUsers.length})
          </button>

          {/* 🔴 Live Client Visit Alerts Tab */}
          <button 
            className={`glass-btn ${activeTab === 'visit_alerts' ? '' : 'glass-btn-secondary'}`}
            style={{
              background: activeTab === 'visit_alerts' 
                ? 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)' 
                : 'rgba(239, 68, 68, 0.15)',
              border: activeTab === 'visit_alerts' ? '1px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fff',
              fontWeight: 800
            }}
            onClick={() => setActiveTab('visit_alerts')}
          >
            <Bell size={15} /> Alerts ({visitAlerts.length})
          </button>

          <button 
            className={`glass-btn ${activeTab === 'bookings' ? '' : 'glass-btn-secondary'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={15} /> Bookings ({allBookings.length})
          </button>

          <button 
            className={`glass-btn ${activeTab === 'properties_manager' ? '' : 'glass-btn-secondary'}`}
            onClick={() => setActiveTab('properties_manager')}
          >
            <Building2 size={15} /> Properties ({adminProperties.length})
          </button>

          <button 
            className={`glass-btn ${activeTab === 'change_password' ? '' : 'glass-btn-secondary'}`}
            onClick={() => setActiveTab('change_password')}
          >
            <Lock size={15} /> Password
          </button>

          <button 
            className={`glass-btn ${activeTab === 'view_replies' ? '' : 'glass-btn-secondary'}`}
            onClick={() => setActiveTab('view_replies')}
          >
            <MessageSquare size={15} /> Replies ({repliesList.length})
          </button>

          {onLogoutAdmin && (
            <button 
              className="glass-btn"
              style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#f87171' }}
              onClick={onLogoutAdmin}
            >
              <Trash2 size={15} style={{ display: 'none' }} />
              <span>🚪 Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          TAB: 🎛️ REAL ESTATE MODULAR CARDS HUB OVERVIEW (Matching Screenshot)
         ========================================================================= */}
      {activeTab === 'hub' && (
        <div style={{ marginBottom: '40px' }}>
          
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px', 
              marginTop: '10px' 
            }}
          >
            {/* 1. Real Estate Properties Catalog */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('properties_manager'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#10b981'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)' }}>
                  <Building2 size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Property Catalog
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  Explore verified villas, apartments, and plots, add new properties directly to MongoDB, and manage live prices.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '14px', fontWeight: 800 }}>
                <span>Manage Properties ({adminProperties.length}) →</span>
              </div>
            </div>

            {/* 2. Registered Real Estate Customers & Users */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('registered_users'); fetchRegisteredUsers(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#a855f7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)' }}>
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Registered Users
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  View real registered buyers, investors, and owners stored in the Real Estate database (0 Mach Mart data).
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#a855f7', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '3px 12px', borderRadius: '12px' }}>
                  {registeredUsers.length} Registered Users
                </span>
              </div>
            </div>

            {/* 3. Site Visit Bookings & Reservations */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('bookings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#f97316'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(249, 115, 22, 0.4)' }}>
                  <FileText size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Property Bookings
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  View all property reservation bookings, token payments, site visits, and booking confirmations.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#f97316', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '3px 12px', borderRadius: '12px' }}>
                  {allBookings.length} Bookings
                </span>
              </div>
            </div>

            {/* 4. Change Password */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('change_password'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)' }}>
                  <Lock size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Change Password
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  Update your account password securely and configure master clearance passcode.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '14px', fontWeight: 800 }}>
                <span>Update →</span>
              </div>
            </div>

            {/* 5. Live Visit Alerts */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('visit_alerts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#ef4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)' }}>
                  <PhoneCall size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Site Visit Alerts
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  Immediate VIP apartment site inspection alerts dispatched by clients via the portal.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '14px', fontWeight: 800 }}>
                <span>View Alerts ({visitAlerts.length}) →</span>
              </div>
            </div>

            {/* 6. Payment Gateway Transactions */}
            <div 
              className="glass-panel"
              onClick={() => { setActiveTab('payments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '22px',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#8b5cf6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)'; }}
            >
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '18px', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)' }}>
                  <CreditCard size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  Payment Gateway
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  Track live Razorpay UPI, credit cards, and cash on visit token collections across Chennai.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c084fc', fontSize: '14px', fontWeight: 800 }}>
                <span>Verify Payments →</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: 👥 REAL ESTATE DEDICATED REGISTERED USERS & CUSTOMERS
         ========================================================================= */}
      {activeTab === 'registered_users' && (
        <div style={{ marginBottom: '32px' }}>
          
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>
                ● Database: MongoDB Atlas ("realestate")
              </span>
              <button
                className="glass-btn"
                onClick={fetchRegisteredUsers}
                style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(168, 85, 247, 0.25)', border: '1px solid #a855f7' }}
              >
                <RefreshCw size={13} className={usersLoading ? 'spin-animation' : ''} />
                <span>Refresh Users</span>
              </button>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="stats-banner glass-panel" style={{ margin: '0 0 24px', padding: '20px 24px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              
              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)' }}>
                  <Users size={22} />
                </div>
                <div>
                  <div className="stat-number">{registeredUsers.length}</div>
                  <div className="stat-label">Total Real Estate Users</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#10b981', background: 'rgba(168, 85, 247, 0.2)' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="stat-number">0 Mach Mart Data</div>
                  <div className="stat-label">Isolation Status: 100% Verified</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)' }}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <div className="stat-number">Real Estate DB</div>
                  <div className="stat-label">Source: Cluster0.realestate.users</div>
                </div>
              </div>

            </div>
          </div>

          {/* Registered Users Table */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  👥 Real Estate Registered Customers & Accounts
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }}>
                  Only users registered directly via the Real Estate portal are listed here. Old Mach Mart accounts are completely excluded.
                </p>
              </div>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                Live MongoDB Sync ({registeredUsers.length})
              </span>
            </div>

            {usersLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <RefreshCw size={24} className="spin-animation" style={{ margin: '0 auto 12px' }} />
                <p>Loading registered accounts from Real Estate database...</p>
              </div>
            ) : registeredUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                <Users size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <h4>No Registered Real Estate Customers Found</h4>
                <p style={{ fontSize: '13px', marginTop: '6px' }}>
                  When someone registers on the Real Estate login page, their record will appear here immediately.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                      <th style={{ padding: '12px 14px' }}>CUSTOMER / USER</th>
                      <th style={{ padding: '12px 14px' }}>EMAIL ADDRESS</th>
                      <th style={{ padding: '12px 14px' }}>PHONE NUMBER</th>
                      <th style={{ padding: '12px 14px' }}>ROLE</th>
                      <th style={{ padding: '12px 14px' }}>REGISTERED AT</th>
                      <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((u, idx) => (
                      <tr 
                        key={u._id || idx}
                        style={{ 
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
                        }}
                      >
                        <td style={{ padding: '14px', fontWeight: 700, color: '#fff' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '13px' }}>
                              {(u.name || 'C').charAt(0).toUpperCase()}
                            </div>
                            <span>{u.name || 'Registered Customer'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px', color: '#38bdf8' }}>
                          {u.email}
                        </td>
                        <td style={{ padding: '14px', color: '#e2e8f0' }}>
                          {u.phone || '—'}
                        </td>
                        <td style={{ padding: '14px' }}>
                          <span style={{ 
                            background: u.role === 'admin' || u.role === 'super_admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                            color: u.role === 'admin' || u.role === 'super_admin' ? '#f87171' : '#c084fc',
                            padding: '3px 10px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            {u.role || 'buyer'}
                          </span>
                        </td>
                        <td style={{ padding: '14px', color: '#94a3b8', fontSize: '12px' }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                        </td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                            title="Delete from Real Estate DB"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 0: 🔴 REAL-TIME CLIENT APARTMENT VISIT ALERTS & NOTIFICATION CENTER
         ========================================================================= */}
      {activeTab === 'visit_alerts' && (
        <div style={{ marginBottom: '32px' }}>
          
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 800 }}>
              🔴 LIVE CLIENT VISIT ALERTS & APPOINTMENTS
            </span>
          </div>
          <div className="stats-banner glass-panel" style={{ margin: '0 0 24px', padding: '20px 24px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              
              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.2)' }}>
                  <Bell size={22} />
                </div>
                <div>
                  <div className="stat-number">{visitAlerts.length} Active</div>
                  <div className="stat-label">Total Visiting Clients</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.2)' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div className="stat-number">{visitAlerts.filter(a => a.status?.includes('TODAY') || a.statusType === 'urgent').length} Visits</div>
                  <div className="stat-label">Urgent Today Appointments</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)' }}>
                  <Car size={22} />
                </div>
                <div>
                  <div className="stat-number">{visitAlerts.filter(a => a.cabRequested || a.cabDispatched).length} Cabs</div>
                  <div className="stat-label">VIP Chauffeur Requests</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.2)' }}>
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">RM Response Rate</div>
                </div>
              </div>

            </div>
          </div>

          {/* Controls Bar */}
          <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="section-tag" style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.15)' }}>
                <Bell size={13} /> CLIENT APARTMENT VISIT LIVE DESK
              </span>
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '4px 0 0' }}>
                Visiting Clients & Apartment Inspection Alerts
              </h3>
            </div>

            {/* Keyword Search */}
            <div style={{ width: '320px' }}>
              <input 
                type="text" 
                placeholder="Search Client Name, Phone, Apartment..." 
                className="glass-input"
                style={{ width: '100%', padding: '9px 14px', fontSize: '13px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Live Alerts Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '20px' }}>
            {visitAlerts
              .filter(alert => {
                if (!searchTerm.trim()) return true;
                const term = searchTerm.toLowerCase();
                return (
                  alert.customerName?.toLowerCase().includes(term) ||
                  alert.customerPhone?.toLowerCase().includes(term) ||
                  alert.customerEmail?.toLowerCase().includes(term) ||
                  alert.apartmentTitle?.toLowerCase().includes(term) ||
                  alert.apartmentLocation?.toLowerCase().includes(term)
                );
              })
              .map((alert) => (
                <div 
                  key={alert.alertId}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    border: alert.statusType === 'urgent' || alert.status?.includes('TODAY')
                      ? '1px solid rgba(239, 68, 68, 0.6)'
                      : '1px solid rgba(168, 85, 247, 0.4)',
                    background: 'linear-gradient(145deg, rgba(15, 17, 32, 0.95) 0%, rgba(26, 23, 60, 0.9) 100%)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  {/* Top Status & Timing Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span 
                      style={{
                        background: alert.status?.includes('CONFIRMED')
                          ? 'rgba(16, 185, 129, 0.25)'
                          : alert.statusType === 'urgent' || alert.status?.includes('TODAY')
                            ? 'rgba(239, 68, 68, 0.25)'
                            : 'rgba(56, 189, 248, 0.25)',
                        color: alert.status?.includes('CONFIRMED')
                          ? '#10b981'
                          : alert.statusType === 'urgent' || alert.status?.includes('TODAY')
                            ? '#f87171'
                            : '#38bdf8',
                        border: alert.status?.includes('CONFIRMED')
                          ? '1px solid #10b981'
                          : alert.statusType === 'urgent' || alert.status?.includes('TODAY')
                            ? '1px solid #ef4444'
                            : '1px solid #38bdf8',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Bell size={12} /> {alert.status}
                    </span>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      🕒 {alert.timestamp || 'Just now'} • Ref: <strong style={{ color: '#c084fc' }}>{alert.alertId}</strong>
                    </span>
                  </div>

                  {/* Customer Details Box */}
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '13px' }}>
                        {alert.customerName?.charAt(0).toUpperCase() || 'C'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '16px', color: '#fff' }}>{alert.customerName}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Visiting Client / Prospective Buyer</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '13px' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Phone Number:</span>
                        <div style={{ fontWeight: 700, color: '#38bdf8' }}>{alert.customerPhone}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Email Address:</span>
                        <div style={{ color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{alert.customerEmail}</div>
                      </div>
                    </div>
                  </div>

                  {/* Apartment / Property to Visit Box */}
                  <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 16px' }}>
                    <span style={{ fontSize: '11px', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                      🏢 APARTMENT TO BE INSPECTED
                    </span>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: '#fff', marginTop: '4px' }}>
                      {alert.apartmentTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <MapPin size={13} color="#38bdf8" />
                      <span>{alert.apartmentLocation}</span>
                      {alert.apartmentPrice && <span style={{ color: '#10b981', fontWeight: 700, marginLeft: '6px' }}>• {alert.apartmentPrice}</span>}
                    </div>

                    <div style={{ marginTop: '10px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                      <Calendar size={14} color="#f59e0b" />
                      <span>Scheduled Slot: <strong style={{ color: '#fff' }}>{alert.visitDate}</strong> ({alert.timeSlot})</span>
                    </div>

                    {alert.notes && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-sub)', fontStyle: 'italic' }}>
                        " {alert.notes} "
                      </div>
                    )}
                  </div>

                  {/* Action Buttons Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                    <a 
                      href={`tel:${alert.customerPhone}`}
                      className="glass-btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <PhoneCall size={14} color="#38bdf8" /> Call Client
                    </a>

                    <a 
                      href={`https://wa.me/${String(alert.customerPhone).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(alert.customerName)},%20Greetings%20from%20AGS%20GARDEN%20CITY.%20Your%20visit%20for%20${encodeURIComponent(alert.apartmentTitle)}%20is%20received!`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981' }}
                    >
                      <MessageSquare size={14} color="#10b981" /> WhatsApp
                    </a>

                    <button 
                      className="glass-btn"
                      style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '10px', background: alert.cabDispatched ? 'rgba(16, 185, 129, 0.3)' : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
                      onClick={() => handleDispatchCab(alert.alertId)}
                    >
                      <Car size={14} /> {alert.cabDispatched ? 'Cab Dispatched ✓' : 'Dispatch VIP Cab'}
                    </button>

                    <button 
                      className="glass-btn"
                      style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                      onClick={() => handleConfirmVisit(alert.alertId)}
                    >
                      <CheckCircle2 size={14} /> Confirm Slot
                    </button>
                  </div>

                  {/* Dismiss button */}
                  <div style={{ textAlign: 'right' }}>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer' }}
                      onClick={() => handleDismissAlert(alert.alertId)}
                    >
                      Dismiss Alert ✕
                    </button>
                  </div>

                </div>
              ))}
          </div>

          {visitAlerts.length === 0 && (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px' }}>All Client Visits Attended!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>New customer apartment visit submissions will appear here in real-time.</p>
            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          TAB 1: DEDICATED STATUS HUB & SEPARATE VIEWS FOR RAZORPAY / CASH / STATUSES
         ========================================================================= */}
      {activeTab === 'bookings' && (
        <div>
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 800 }}>
              📦 ORDER HISTORY & TAX INVOICE STATUS HUB
            </span>
          </div>

          {/* Top KPI Metrics */}
          <div className="stats-banner glass-panel" style={{ margin: '0 0 24px', padding: '18px 24px' }}>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div 
                className="stat-item" 
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setActiveStatusSubView('RAZORPAY_STATUS')}
              >
                <div className="stat-icon-wrapper" style={{ color: '#c084fc' }}>
                  <CreditCard size={22} />
                </div>
                <div>
                  <div className="stat-number">₹{razorpayRevenue.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Razorpay Online Collected ({razorpayList.length})</div>
                </div>
              </div>

              <div 
                className="stat-item" 
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setActiveStatusSubView('CASH_STATUS')}
              >
                <div className="stat-icon-wrapper" style={{ color: '#10b981' }}>
                  <Banknote size={22} />
                </div>
                <div>
                  <div className="stat-number">₹{cashDueTotal.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Cash on Site Inspection ({cashList.length})</div>
                </div>
              </div>

              <div 
                className="stat-item" 
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setActiveStatusSubView('CONFIRMED')}
              >
                <div className="stat-icon-wrapper" style={{ color: '#38bdf8' }}>
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <div className="stat-number">{confirmedList.length} Active</div>
                  <div className="stat-label">Verified Confirmed Buyers</div>
                </div>
              </div>

              <div 
                className="stat-item" 
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onClick={() => setActiveStatusSubView('PENDING_INSPECTION')}
              >
                <div className="stat-icon-wrapper" style={{ color: '#f59e0b' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div className="stat-number">{pendingList.length + scheduledList.length} Slots</div>
                  <div className="stat-label">Upcoming Site Inspections</div>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED SEPARATE STATUS TABS NAVIGATION */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              
              {/* All Bookings Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'ALL' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('ALL')}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                <Users size={14} /> All Bookings ({allBookings.length})
              </button>

              {/* 🟢 Confirmed Status Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'CONFIRMED' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('CONFIRMED')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'CONFIRMED' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                  background: activeStatusSubView === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: activeStatusSubView === 'CONFIRMED' ? '#10b981' : '#fff'
                }}
              >
                🟢 CONFIRMED STATUS ({confirmedList.length})
              </button>

              {/* 🔵 Inspection Scheduled Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'INSPECTION_SCHEDULED' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('INSPECTION_SCHEDULED')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'INSPECTION_SCHEDULED' ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  background: activeStatusSubView === 'INSPECTION_SCHEDULED' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: activeStatusSubView === 'INSPECTION_SCHEDULED' ? '#38bdf8' : '#fff'
                }}
              >
                🔵 INSPECTION SCHEDULED ({scheduledList.length})
              </button>

              {/* 🟡 Pending Inspection Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'PENDING_INSPECTION' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('PENDING_INSPECTION')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'PENDING_INSPECTION' ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  background: activeStatusSubView === 'PENDING_INSPECTION' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: activeStatusSubView === 'PENDING_INSPECTION' ? '#f59e0b' : '#fff'
                }}
              >
                🟡 PENDING INSPECTION ({pendingList.length})
              </button>

              {/* ❌ Cancelled / Rejected Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'CANCELLED' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('CANCELLED')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'CANCELLED' ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                  background: activeStatusSubView === 'CANCELLED' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: activeStatusSubView === 'CANCELLED' ? '#ef4444' : '#fff'
                }}
              >
                ❌ CANCELLED / REJECTED ({cancelledList.length})
              </button>

              {/* ✅ Completed Tab */}
              <button
                className={`filter-pill ${activeStatusSubView === 'COMPLETED' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('COMPLETED')}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                ✅ COMPLETED ({completedList.length})
              </button>

              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }}></div>

              {/* 💳 SEPARATE RAZORPAY GATEWAY VIEW TAB */}
              <button
                className={`filter-pill ${activeStatusSubView === 'RAZORPAY_STATUS' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('RAZORPAY_STATUS')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'RAZORPAY_STATUS' ? '2px solid #a855f7' : '1px solid rgba(168, 85, 247, 0.4)',
                  background: activeStatusSubView === 'RAZORPAY_STATUS' ? 'rgba(168, 85, 247, 0.35)' : 'rgba(168, 85, 247, 0.1)',
                  color: '#c084fc',
                  fontWeight: 800
                }}
              >
                <CreditCard size={14} /> 💳 RAZORPAY STATUS VIEW ({razorpayList.length})
              </button>

              {/* 💵 SEPARATE CASH ON VISIT VIEW TAB */}
              <button
                className={`filter-pill ${activeStatusSubView === 'CASH_STATUS' ? 'filter-pill-active' : ''}`}
                onClick={() => setActiveStatusSubView('CASH_STATUS')}
                style={{
                  fontSize: '13px',
                  padding: '8px 16px',
                  border: activeStatusSubView === 'CASH_STATUS' ? '2px solid #10b981' : '1px solid rgba(16, 185, 129, 0.4)',
                  background: activeStatusSubView === 'CASH_STATUS' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  fontWeight: 800
                }}
              >
                <Banknote size={14} /> 💵 CASH ON HAND VIEW ({cashList.length})
              </button>

            </div>
          </div>

          {/* DEDICATED HEADER BANNER FOR CURRENT ACTIVE SUB-VIEW */}
          <div className="glass-panel" style={{ padding: '14px 20px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CURRENTLY VIEWING SEPARATE STATUS PAGE:
              </span>
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {activeStatusSubView === 'ALL' && <>📋 All Customer Appointments & Bookings ({displayedBookings.length})</>}
                {activeStatusSubView === 'CONFIRMED' && <><span style={{ color: '#10b981' }}>🟢 Verified Confirmed Bookings</span> ({displayedBookings.length})</>}
                {activeStatusSubView === 'INSPECTION_SCHEDULED' && <><span style={{ color: '#38bdf8' }}>🔵 Scheduled Site Inspections</span> ({displayedBookings.length})</>}
                {activeStatusSubView === 'PENDING_INSPECTION' && <><span style={{ color: '#f59e0b' }}>🟡 Pending Review & Inspection</span> ({displayedBookings.length})</>}
                {activeStatusSubView === 'COMPLETED' && <><span style={{ color: '#10b981' }}>✅ Fully Completed & Closed Bookings</span> ({displayedBookings.length})</>}
                {activeStatusSubView === 'RAZORPAY_STATUS' && <><span style={{ color: '#c084fc' }}>💳 Razorpay Online Gateway Transactions</span> (₹{razorpayRevenue.toLocaleString('en-IN')})</>}
                {activeStatusSubView === 'CASH_STATUS' && <><span style={{ color: '#10b981' }}>💵 Cash on Hand & Site Inspection Ledger</span> (₹{cashDueTotal.toLocaleString('en-IN')})</>}
              </h3>
            </div>

            {/* Keyword Search */}
            <div style={{ width: '280px' }}>
              <input 
                type="text" 
                placeholder="Search Customer / Booking Ref..." 
                className="glass-input"
                style={{ padding: '8px 14px', fontSize: '12px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* =====================================================================
              VIEW 1: RAZORPAY DEDICATED VIEW TABLE
             ===================================================================== */}
          {activeStatusSubView === 'RAZORPAY_STATUS' && (
            <div className="glass-panel" style={{ padding: '0', overflowX: 'auto', borderRadius: '18px', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              <div style={{ padding: '14px 20px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px', color: '#c084fc' }}>
                  💳 RAZORPAY GATEWAY PAYMENT VERIFICATION LOGS
                </strong>
                <span style={{ fontSize: '12px', color: '#fff' }}>
                  Total Online Revenue: <strong style={{ color: '#10b981' }}>₹{razorpayRevenue.toLocaleString('en-IN')}</strong>
                </span>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 18px' }}>Razorpay Txn ID</th>
                    <th style={{ padding: '14px 18px' }}>Booking Ref</th>
                    <th style={{ padding: '14px 18px' }}>Customer Name & Phone</th>
                    <th style={{ padding: '14px 18px' }}>Property Title</th>
                    <th style={{ padding: '14px 18px' }}>Amount Paid</th>
                    <th style={{ padding: '14px 18px' }}>Payment Mode</th>
                    <th style={{ padding: '14px 18px' }}>Gateway Status</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBookings.map((b) => (
                    <tr key={b.bookingId} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontFamily: 'monospace', color: '#c084fc', fontWeight: 800 }}>{b.transactionId}</span>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.date}</div>
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 700 }}>{b.bookingId}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{b.buyerName}</div>
                        <div style={{ fontSize: '11px', color: '#38bdf8' }}>{b.buyerPhone}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div>{b.propertyTitle}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.propertyLocation}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <strong style={{ fontSize: '15px', color: '#10b981' }}>₹{b.tokenPaid?.toLocaleString('en-IN')}</strong>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                          {b.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ color: '#10b981', fontWeight: 800, fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> PAID / VERIFIED
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        <button 
                          className="glass-btn-secondary" 
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                          onClick={() => setSelectedBookingForView(b)}
                        >
                          <Eye size={12} /> Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* =====================================================================
              VIEW 2: CASH ON HAND / CASH ON VISIT DEDICATED VIEW TABLE
             ===================================================================== */}
          {activeStatusSubView === 'CASH_STATUS' && (
            <div className="glass-panel" style={{ padding: '0', overflowX: 'auto', borderRadius: '18px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
              <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px', color: '#10b981' }}>
                  💵 CASH ON SITE INSPECTION LEDGER
                </strong>
                <span style={{ fontSize: '12px', color: '#fff' }}>
                  Pending Cash to Collect: <strong style={{ color: '#f59e0b' }}>₹{cashDueTotal.toLocaleString('en-IN')}</strong>
                </span>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 18px' }}>Booking Ref</th>
                    <th style={{ padding: '14px 18px' }}>Customer Name & Contact</th>
                    <th style={{ padding: '14px 18px' }}>Property Title</th>
                    <th style={{ padding: '14px 18px' }}>Cash Due at Site</th>
                    <th style={{ padding: '14px 18px' }}>Inspection Slot</th>
                    <th style={{ padding: '14px 18px' }}>Assigned Executive</th>
                    <th style={{ padding: '14px 18px' }}>Collection Status</th>
                    <th style={{ padding: '14px 18px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBookings.map((b) => (
                    <tr key={b.bookingId} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ color: '#10b981', fontWeight: 800 }}>{b.bookingId}</span>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.date}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{b.buyerName}</div>
                        <div style={{ fontSize: '11px', color: '#38bdf8' }}>{b.buyerPhone}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div>{b.propertyTitle}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.propertyLocation}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <strong style={{ fontSize: '15px', color: '#f59e0b' }}>₹{b.tokenPaid?.toLocaleString('en-IN')}</strong>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700 }}>{b.visitDate}</div>
                        <span style={{ fontSize: '10px', color: '#c084fc' }}>⏰ {b.timeSlot}</span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 600 }}>{b.assignedManager}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{b.managerContact}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          color: b.paymentStatus.includes('PAID') ? '#10b981' : '#f59e0b',
                          background: b.paymentStatus.includes('PAID') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                        {!b.paymentStatus.includes('PAID') ? (
                          <button 
                            className="glass-btn" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                            onClick={() => handleMarkCashCollected(b.bookingId)}
                          >
                            <CheckCheck size={12} /> Mark Cash Collected
                          </button>
                        ) : (
                          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>✓ Verified</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* =====================================================================
              VIEW 3: STANDARD STATUS FILTERED TABLE (ALL, CONFIRMED, SCHEDULED...)
             ===================================================================== */}
          {activeStatusSubView !== 'RAZORPAY_STATUS' && activeStatusSubView !== 'CASH_STATUS' && (
            <div className="glass-panel" style={{ padding: '0', overflowX: 'auto', borderRadius: '18px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Booking Ref</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Customer Name & Contact</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Property Reserved</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Token / Payment Mode</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Visit Date & Time Slot</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700, textAlign: 'center' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBookings.length > 0 ? (
                    displayedBookings.map((booking) => (
                      <tr key={booking.bookingId} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <span style={{ fontWeight: 800, color: '#c084fc', fontFamily: 'monospace' }}>{booking.bookingId}</span>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{booking.date}</div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{booking.buyerName}</div>
                          <div style={{ fontSize: '12px', color: '#38bdf8' }}>{booking.buyerPhone}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{booking.buyerEmail}</div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 600, color: '#fff' }}>{booking.propertyTitle}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{booking.propertyLocation}</div>
                          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>{booking.propertyPrice}</span>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 800, color: '#fff' }}>₹{booking.tokenPaid?.toLocaleString('en-IN')}</div>
                          <span style={{ fontSize: '11px', color: booking.paymentMethod.includes('Razorpay') ? '#38bdf8' : '#f59e0b' }}>
                            {booking.paymentMethod}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{booking.visitDate}</div>
                          <span style={{ fontSize: '11px', color: '#c084fc', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                            ⏰ {booking.timeSlot || '10:00 AM - 11:30 AM'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top' }}>
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.bookingId, e.target.value)}
                            style={{
                              background: booking.status === 'CONFIRMED' || booking.status === 'COMPLETED' 
                                ? 'rgba(16, 185, 129, 0.2)' 
                                : booking.status === 'CANCELLED'
                                  ? 'rgba(239, 68, 68, 0.2)'
                                  : 'rgba(245, 158, 11, 0.2)',
                              color: booking.status === 'CONFIRMED' || booking.status === 'COMPLETED' ? '#10b981' : booking.status === 'CANCELLED' ? '#ef4444' : '#f59e0b',
                              border: '1px solid rgba(255,255,255,0.15)',
                              borderRadius: '6px',
                              padding: '5px 8px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <option value="CONFIRMED" style={{ background: '#111222', color: '#10b981' }}>CONFIRMED</option>
                            <option value="INSPECTION SCHEDULED" style={{ background: '#111222', color: '#38bdf8' }}>INSPECTION SCHEDULED</option>
                            <option value="PENDING INSPECTION" style={{ background: '#111222', color: '#f59e0b' }}>PENDING INSPECTION</option>
                            <option value="COMPLETED" style={{ background: '#111222', color: '#10b981' }}>COMPLETED</option>
                            <option value="CANCELLED" style={{ background: '#111222', color: '#ef4444' }}>CANCELLED</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'top', textAlign: 'center' }}>
                          <button 
                            className="glass-btn-secondary" 
                            style={{ padding: '6px 10px', fontSize: '11px' }}
                            onClick={() => setSelectedBookingForView(booking)}
                          >
                            <Eye size={13} /> View Dossier
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No bookings found in {activeStatusSubView} view.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: PROPERTIES & OFFER PRICE MANAGER (PHOTO UPLOADER & OFFER NOTE)
         ========================================================================= */}
      {activeTab === 'properties_manager' && (
        <div>
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>
              🛒 PROPERTY CATALOGUE & MULTI-ANGLE INVENTORY
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '22px', margin: 0 }}>Property Catalogue, Photo Uploader & Offer Deals</h2>
                <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={12} /> {dbStatus}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
                Manage photos, set strikethrough original prices, and highlight special offer notes across customer pages.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="glass-btn-secondary" 
                onClick={fetchBackendProperties}
                disabled={dbLoading}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '8px 14px' }}
                title="Fetch latest properties and photos from MongoDB database (Port 5002)"
              >
                <RefreshCw size={14} style={{ animation: dbLoading ? 'spin 1s linear infinite' : 'none' }} />
                {dbLoading ? 'Syncing...' : 'Fetch MongoDB Properties'}
              </button>

              <button className="glass-btn" onClick={handleOpenNewPropertyModal}>
                <PlusCircle size={16} /> Add New Property with Images & Offer
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '0', overflowX: 'auto', borderRadius: '18px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Property Photo</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Title & Location</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Pricing & Special Offer Deal</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>Special Offer Note</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, textAlign: 'center' }}>Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProperties.map((prop) => (
                  <tr key={prop.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '16px 20px', verticalAlign: 'middle', width: '120px' }}>
                      <div style={{ width: '90px', height: '60px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: '2px', right: '4px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '4px' }}>
                          📷 {prop.gallery?.length || 1}
                        </span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>{prop.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{prop.location}</div>
                      <span style={{ fontSize: '11px', color: '#c084fc', background: 'rgba(168, 85, 247, 0.15)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                        {prop.type} • {prop.beds} Beds • {prop.sqft} sq.ft
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                      {prop.originalPrice && (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          Original: {prop.originalPrice}
                        </div>
                      )}
                      <div style={{ fontWeight: 800, color: '#10b981', fontSize: '15px' }}>
                        Offer: {prop.offerPrice || prop.price}
                      </div>
                      {prop.offerDiscount && (
                        <span style={{ fontSize: '10px', background: '#ef4444', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          {prop.offerDiscount}
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px', verticalAlign: 'middle', maxWidth: '320px' }}>
                      {prop.offerNote ? (
                        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '8px 10px', fontSize: '11px', color: '#fca5a5' }}>
                          <Gift size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          <strong>Offer Note: </strong>{prop.offerNote}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>No Active Offer Note</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button 
                          className="glass-btn-secondary" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => setPreviewProperty(prop)}
                        >
                          <Eye size={14} /> Preview
                        </button>

                        <button 
                          className="glass-btn" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => handleEditProperty(prop)}
                        >
                          <Edit3 size={14} /> Edit Offer
                        </button>

                        <button 
                          className="glass-btn-secondary" 
                          style={{ padding: '6px 10px', fontSize: '12px', color: '#ef4444' }}
                          onClick={() => handleDeleteProperty(prop.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: 🔒 CHANGE PASSWORD & MASTER SECURITY CLEARANCE
         ========================================================================= */}
      {activeTab === 'change_password' && (
        <div style={{ maxWidth: '640px', margin: '0 auto 40px' }}>
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>
              🔒 SECURITY & ACCESS CLEARANCE
            </span>
          </div>

          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.85)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '16px' }}>
              <Lock size={28} />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
              Change Admin Passcode
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              Update master admin security passcode. Requires master clearance key (<code style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '6px' }}>AGS2026</code>).
            </p>

            {passcodeMsg.text && (
              <div 
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  marginBottom: '20px', 
                  fontSize: '13px', 
                  fontWeight: 700,
                  background: passcodeMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: passcodeMsg.type === 'success' ? '1px solid #10b981' : '1px solid #ef4444',
                  color: passcodeMsg.type === 'success' ? '#6ee7b7' : '#fca5a5'
                }}
              >
                {passcodeMsg.text}
              </div>
            )}

            <form onSubmit={handlePasscodeUpdate}>
              <div className="auth-field-group" style={{ marginBottom: '14px' }}>
                <label className="field-label">Current Passcode</label>
                <input 
                  type="password" 
                  placeholder="Enter current passcode"
                  className="glass-input"
                  value={passcodeForm.currentPasscode}
                  onChange={(e) => setPasscodeForm({ ...passcodeForm, currentPasscode: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div className="auth-field-group" style={{ marginBottom: '14px' }}>
                <label className="field-label">New Security Passcode</label>
                <input 
                  type="password" 
                  placeholder="Enter new 6+ char passcode"
                  className="glass-input"
                  value={passcodeForm.newPasscode}
                  onChange={(e) => setPasscodeForm({ ...passcodeForm, newPasscode: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div className="auth-field-group" style={{ marginBottom: '14px' }}>
                <label className="field-label">Confirm New Passcode</label>
                <input 
                  type="password" 
                  placeholder="Re-enter new passcode"
                  className="glass-input"
                  value={passcodeForm.confirmPasscode}
                  onChange={(e) => setPasscodeForm({ ...passcodeForm, confirmPasscode: e.target.value })}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div className="auth-field-group" style={{ marginBottom: '22px' }}>
                <label className="field-label" style={{ color: '#f59e0b' }}>
                  Master Clearance Key (Required)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. AGS2026"
                  className="glass-input"
                  value={passcodeForm.clearanceKey}
                  onChange={(e) => setPasscodeForm({ ...passcodeForm, clearanceKey: e.target.value })}
                  style={{ width: '100%', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="glass-btn-secondary"
                  onClick={() => setPasscodeForm({ currentPasscode: 'admin123', newPasscode: 'admin2026', confirmPasscode: 'admin2026', clearanceKey: 'AGS2026' })}
                  style={{ fontSize: '12px', padding: '10px 14px' }}
                >
                  ⚡ Auto-Fill Demo
                </button>

                <button 
                  type="submit" 
                  className="glass-btn"
                  style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000', fontWeight: 900 }}
                >
                  <Key size={16} /> Update Security Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: 🛡️ VIEW REPLIES, COMPLAINTS & CUSTOMER FEEDBACK
         ========================================================================= */}
      {activeTab === 'view_replies' && (
        <div style={{ marginBottom: '40px' }}>
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#06b6d4', fontWeight: 800 }}>
              🛡️ CUSTOMER REPLIES, INQUIRIES & COMPLAINTS DESK
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
            {/* Left: Replies List */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="#06b6d4" /> Recent Customer Tickets & Responses ({repliesList.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {repliesList.map((rep) => (
                  <div 
                    key={rep.id} 
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <strong style={{ color: '#fff', fontSize: '14px' }}>{rep.customerName}</strong>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '8px' }}>{rep.customerPhone}</span>
                      </div>
                      <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>
                        {rep.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
                      {rep.subject}
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', lineHeight: 1.5, margin: '0 0 10px', background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '10px' }}>
                      "{rep.message}"
                    </p>

                    <div style={{ background: 'rgba(6, 182, 212, 0.08)', borderLeft: '3px solid #06b6d4', padding: '8px 12px', borderRadius: '0 8px 8px 0', fontSize: '12px', color: '#e2e8f0' }}>
                      <strong style={{ color: '#06b6d4', display: 'block', fontSize: '11px', marginBottom: '2px' }}>Admin Response:</strong>
                      {rep.reply}
                    </div>

                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right' }}>
                      {rep.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dispatch New Reply Form */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                Dispatch New Customer Reply
              </h3>

              <form onSubmit={handleSendReply}>
                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Customer Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Anand Kumar"
                    className="glass-input"
                    value={newReplyForm.customerName}
                    onChange={(e) => setNewReplyForm({ ...newReplyForm, customerName: e.target.value })}
                    style={{ width: '100%' }}
                    required
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Customer Phone (+91)</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 98401 23456"
                    className="glass-input"
                    value={newReplyForm.customerPhone}
                    onChange={(e) => setNewReplyForm({ ...newReplyForm, customerPhone: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Subject / Property Reference</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Azure Bay Villa Price Inquiry"
                    className="glass-input"
                    value={newReplyForm.subject}
                    onChange={(e) => setNewReplyForm({ ...newReplyForm, subject: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '12px' }}>
                  <label className="field-label">Customer Message Summary</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Customer asked for Saturday inspection schedule"
                    className="glass-input"
                    value={newReplyForm.message}
                    onChange={(e) => setNewReplyForm({ ...newReplyForm, message: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="auth-field-group" style={{ marginBottom: '18px' }}>
                  <label className="field-label" style={{ color: '#06b6d4' }}>Admin Reply Content</label>
                  <textarea 
                    rows={4}
                    placeholder="Type official admin reply to be dispatched to customer's WhatsApp & SMS..."
                    className="glass-input"
                    value={newReplyForm.replyText}
                    onChange={(e) => setNewReplyForm({ ...newReplyForm, replyText: e.target.value })}
                    style={{ width: '100%', resize: 'none' }}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="glass-btn"
                  style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)', fontWeight: 800 }}
                >
                  <Send size={15} /> Dispatch Reply Notification
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: 💳 PAYMENT GATEWAY & TRANSACTION REVENUE HUB
         ========================================================================= */}
      {activeTab === 'payments' && (
        <div style={{ marginBottom: '40px' }}>
          {/* Back to Control Hub Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="glass-btn-secondary" 
              onClick={() => { setActiveTab('hub'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> ← Back to Admin Control Hub
            </button>
            <span style={{ fontSize: '12px', color: '#c084fc', fontWeight: 800 }}>
              💳 LIVE PAYMENT GATEWAY & TRANSACTION AUDIT
            </span>
          </div>

          <div className="stats-banner glass-panel" style={{ margin: '0 0 24px', padding: '20px 24px' }}>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)' }}>
                  <CreditCard size={22} />
                </div>
                <div>
                  <div className="stat-number">₹{razorpayRevenue.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Razorpay Online Verified ({razorpayList.length})</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.2)' }}>
                  <Banknote size={22} />
                </div>
                <div>
                  <div className="stat-number">₹{cashDueTotal.toLocaleString('en-IN')}</div>
                  <div className="stat-label">Cash on Inspection Handed ({cashList.length})</div>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon-wrapper" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)' }}>
                  <DollarSign size={22} />
                </div>
                <div>
                  <div className="stat-number">₹{(razorpayRevenue + cashDueTotal).toLocaleString('en-IN')}</div>
                  <div className="stat-label">Total Realized Revenue ({allBookings.length})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT PROPERTY WITH IMAGE UPLOADER & OFFER PRICE
         ========================================================================= */}
      {showPropertyModal && (
        <div className="glass-modal-overlay" onClick={() => setShowPropertyModal(false)}>
          <div className="glass-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close-btn" onClick={() => setShowPropertyModal(false)}>
              <X size={20} />
            </button>

            <span className="section-tag" style={{ color: '#ef4444' }}>
              <Flame size={14} /> {editingProperty ? 'EDIT PROPERTY & OFFER' : 'CREATE NEW PROPERTY LISTING'}
            </span>
            <h2 style={{ fontSize: '22px', margin: '4px 0 16px' }}>
              Property Details, Photo Uploader & Special Offer Note
            </h2>

            <form onSubmit={handleSavePropertyForm} className="auth-form">
              {/* Photo Uploader Section */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '18px' }}>
                <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#c084fc', marginBottom: '8px' }}>
                  <ImageIcon size={16} /> 1. Upload Property Images & Gallery Photos
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <label 
                    className="glass-btn" 
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontSize: '13px' }}
                  >
                    <Upload size={16} /> Choose Images to Upload
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={handleImageFileUpload}
                    />
                  </label>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Upload multiple high-res photos (Living Room, Bedroom, Balcony)
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="field-label" style={{ fontSize: '12px' }}>Or Paste Image Web URL (Unsplash / Hosted Link):</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="url" 
                      className="glass-input" 
                      placeholder="https://images.unsplash.com/photo-..." 
                      value={propertyForm.image}
                      onChange={(e) => {
                        const url = e.target.value;
                        setPropertyForm(prev => ({
                          ...prev,
                          image: url,
                          gallery: prev.gallery.length === 0 ? [url] : prev.gallery
                        }));
                      }}
                    />
                    <button 
                      type="button" 
                      className="glass-btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '12px', whiteSpace: 'nowrap' }}
                      onClick={() => {
                        if (propertyForm.image && !propertyForm.gallery.includes(propertyForm.image)) {
                          setPropertyForm(prev => ({
                            ...prev,
                            gallery: [...prev.gallery, prev.image]
                          }));
                        }
                      }}
                    >
                      + Add to Photos
                    </button>
                  </div>
                </div>

                {propertyForm.gallery.length > 0 && (
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Uploaded Photos ({propertyForm.gallery.length} Images - First image is Primary Cover):
                    </span>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {propertyForm.gallery.map((imgUrl, idx) => (
                        <div key={idx} style={{ width: '95px', height: '65px', borderRadius: '10px', overflow: 'hidden', position: 'relative', border: idx === 0 ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.2)' }}>
                          <img src={imgUrl} alt={`preview-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {idx === 0 && (
                            <span style={{ position: 'absolute', top: '2px', left: '2px', background: '#9333ea', color: '#fff', fontSize: '8px', padding: '1px 4px', borderRadius: '3px', fontWeight: 800 }}>
                              COVER
                            </span>
                          )}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveGalleryImage(idx)}
                            style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Basic Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
                <div>
                  <label className="field-label">Property Title *</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    required 
                    placeholder="Emerald Luxe 3 BHK Residence"
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="field-label">Property Type</label>
                  <select 
                    className="glass-input"
                    value={propertyForm.type}
                    onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Office">Commercial</option>
                    <option value="Residential Plot">Residential Plot</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="field-label">Location</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    required 
                    value={propertyForm.location}
                    onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="field-label">Beds (BHK)</label>
                  <input 
                    type="number" 
                    className="glass-input" 
                    value={propertyForm.beds}
                    onChange={(e) => setPropertyForm({ ...propertyForm, beds: e.target.value })}
                  />
                </div>
                <div>
                  <label className="field-label">Baths</label>
                  <input 
                    type="number" 
                    className="glass-input" 
                    value={propertyForm.baths}
                    onChange={(e) => setPropertyForm({ ...propertyForm, baths: e.target.value })}
                  />
                </div>
                <div>
                  <label className="field-label">Sqft</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    value={propertyForm.sqft}
                    onChange={(e) => setPropertyForm({ ...propertyForm, sqft: e.target.value })}
                  />
                </div>
              </div>

              {/* SPECIAL OFFER PRICE & OFFER NOTE SECTION */}
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.35)', margin: '14px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 800, fontSize: '14px', marginBottom: '10px' }}>
                  <Flame size={16} /> 2. Special Offer Pricing & Highlight Note
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label className="field-label">Original Price (Strikethrough)</label>
                    <input 
                      type="text" 
                      className="glass-input" 
                      placeholder="₹1,40,00,000"
                      value={propertyForm.originalPrice}
                      onChange={(e) => setPropertyForm({ ...propertyForm, originalPrice: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="field-label" style={{ color: '#10b981' }}>Special Offer Price *</label>
                    <input 
                      type="text" 
                      className="glass-input" 
                      required
                      placeholder="₹1,25,00,000"
                      value={propertyForm.offerPrice}
                      onChange={(e) => setPropertyForm({ ...propertyForm, offerPrice: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="field-label">Discount Badge</label>
                    <input 
                      type="text" 
                      className="glass-input" 
                      placeholder="11% OFF / Save ₹15L"
                      value={propertyForm.offerDiscount}
                      onChange={(e) => setPropertyForm({ ...propertyForm, offerDiscount: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" style={{ color: '#fca5a5' }}>Special Offer Note (Appears on Customer Pages) *</label>
                  <textarea 
                    className="glass-input" 
                    rows="2"
                    placeholder="🎉 FESTIVE SPECIAL: Save ₹15 Lakhs + Free Modular Kitchen + 0% Stamp Duty!"
                    value={propertyForm.offerNote}
                    onChange={(e) => setPropertyForm({ ...propertyForm, offerNote: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* Submit / Live Preview Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '14px' }}>
                <button 
                  type="button" 
                  className="glass-btn-secondary"
                  onClick={() => setPreviewProperty(propertyForm)}
                >
                  <Eye size={15} /> 👁️ Live Preview Customer View
                </button>

                <button type="submit" className="glass-btn">
                  <Check size={16} /> Publish Property & Offer Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: LIVE CUSTOMER PAGE PREVIEW
         ========================================================================= */}
      {previewProperty && (
        <div className="glass-modal-overlay" onClick={() => setPreviewProperty(null)}>
          <div className="glass-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close-btn" onClick={() => setPreviewProperty(null)}>
              <X size={20} />
            </button>

            <span className="section-tag" style={{ color: '#10b981' }}>
              <Eye size={14} /> LIVE CUSTOMER VIEW PREVIEW
            </span>
            <h3 style={{ fontSize: '18px', margin: '4px 0 16px' }}>This is how customers will see your property:</h3>

            <Propertycard property={previewProperty} />

            <div style={{ marginTop: '18px', textAlign: 'center' }}>
              <button className="glass-btn" onClick={() => setPreviewProperty(null)}>
                Looks Great! Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CUSTOMER DOSSIER & BRIGHT CLEAN A4 PRINT VIEW
         ========================================================================= */}
      {selectedBookingForView && (
        <div className="glass-modal-overlay" onClick={() => setSelectedBookingForView(null)}>
          <div 
            className="glass-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '820px', 
              padding: '16px',
              background: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            {/* Top Action Controls Bar (Hidden in Print) */}
            <div 
              className="dossier-modal-top-bar no-print"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '14px',
                marginBottom: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  color: '#fff', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  padding: '4px 10px', 
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={13} /> OFFICIAL A4 DOSSIER
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Bright Clean White Print & PDF Ready
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="glass-btn" 
                  onClick={() => window.print()}
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 800,
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                  title="Print or Save as Clean White PDF"
                >
                  <Printer size={15} /> Print Clean White Dossier / Save PDF
                </button>
                <button 
                  className="glass-btn-secondary" 
                  onClick={() => setSelectedBookingForView(null)}
                  style={{ padding: '8px 14px', fontSize: '13px', borderRadius: '10px' }}
                >
                  <X size={14} /> Close
                </button>
              </div>
            </div>

            {/* =========================================================
                PRINTABLE BRIGHT CLEAN WHITE OFFICIAL REAL ESTATE DOSSIER
               ========================================================= */}
            <div id="printableDossier" className="dossier-paper-container">
              
              {/* Official Header Letterhead */}
              <div className="dossier-letterhead">
                <div className="dossier-brand-group">
                  <div className="dossier-logo-box">
                    <img 
                      src={AGS_LOGO_BASE64} 
                      alt="AGS Garden City Logo" 
                      className="dossier-logo-img" 
                    />
                  </div>
                  <div>
                    <h1 className="dossier-main-title">AGS GARDEN CITY</h1>
                    <div className="dossier-sub-tag">PREMIER LUXURY REAL ESTATE DEVELOPERS & RESIDENCES</div>
                    <div className="dossier-meta-text">
                      OMR & ECR Coastal Corridor, Chennai, Tamil Nadu • Desk: +91 73971 35792 • support@agsgarden.com
                    </div>
                  </div>
                </div>

                <div className="dossier-ref-badge-box">
                  <span className="dossier-doc-type">OFFICIAL CUSTOMER DOSSIER</span>
                  <div className="dossier-ref-number">#{selectedBookingForView.bookingId}</div>
                  <div className="dossier-issue-date">
                    Issued: {selectedBookingForView.date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="dossier-status-pill">
                    ✓ {selectedBookingForView.status || 'CONFIRMED'}
                  </div>
                </div>
              </div>

              {/* Legal & Regulatory License Bar */}
              <div className="dossier-license-bar">
                <span>TN RERA REG: <strong>TN/29/Building/0189/2026</strong></span>
                <span>GSTIN: <strong>33AAACG2026R1ZM</strong></span>
                <span>SAC CODE: <strong>997222</strong> (Real Estate Services)</span>
                <span>RECORD: <strong>REALESTATE DATABASE</strong></span>
              </div>

              {/* 2-Column Structured Data Cards */}
              <div className="dossier-grid">
                
                {/* 1. Customer KYC Profile */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>👤 Customer KYC Profile</span>
                    <span className="dossier-chip green">Verified Client</span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Buyer Full Name:</span>
                      <span className="dossier-val bold">{selectedBookingForView.buyerName}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Contact Phone:</span>
                      <span className="dossier-val">{selectedBookingForView.buyerPhone}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Email Address:</span>
                      <span className="dossier-val">{selectedBookingForView.buyerEmail}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">KYC Verification:</span>
                      <span className="dossier-val bold green-text">✓ Real Estate Verified</span>
                    </div>
                  </div>
                </div>

                {/* 2. Property Allotment Details */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>🏢 Property Allotment Details</span>
                    <span className="dossier-chip blue">Reserved Unit</span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Property Title:</span>
                      <span className="dossier-val bold">{selectedBookingForView.propertyTitle}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Location / Area:</span>
                      <span className="dossier-val">{selectedBookingForView.propertyLocation}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Total Valuation:</span>
                      <span className="dossier-val bold emerald-text">{selectedBookingForView.propertyPrice}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Allotment Type:</span>
                      <span className="dossier-val">Priority Advance Allocation</span>
                    </div>
                  </div>
                </div>

                {/* 3. Token Advance & Payment Audit */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>💳 Token Payment Audit</span>
                    <span className="dossier-chip emerald">Paid & Reconciled</span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row highlight-amount">
                      <span className="dossier-lbl">Token Advance Paid:</span>
                      <span className="dossier-amount">₹{selectedBookingForView.tokenPaid?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Payment Mode:</span>
                      <span className="dossier-val">{selectedBookingForView.paymentMethod}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Txn Reference ID:</span>
                      <span className="dossier-val mono">{selectedBookingForView.transactionId || 'TXN-AGS-VERIFIED'}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Receipt Status:</span>
                      <span className="dossier-val bold green-text">Official GST Cleared</span>
                    </div>
                  </div>
                </div>

                {/* 4. Inspection & Senior Executive Assignment */}
                <div className="dossier-card">
                  <div className="dossier-card-title">
                    <span>🗓️ Site Inspection & Assistance</span>
                    <span className="dossier-chip purple">Escort Arranged</span>
                  </div>
                  <div className="dossier-card-body">
                    <div className="dossier-row">
                      <span className="dossier-lbl">Scheduled Date:</span>
                      <span className="dossier-val bold">{selectedBookingForView.visitDate}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Time Slot:</span>
                      <span className="dossier-val">{selectedBookingForView.timeSlot || '10:30 AM - 12:00 PM'}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">Relationship Manager:</span>
                      <span className="dossier-val">{selectedBookingForView.assignedManager || 'Suresh Kumar (Senior VP)'}</span>
                    </div>
                    <div className="dossier-row">
                      <span className="dossier-lbl">VIP Chauffeur Cab:</span>
                      <span className="dossier-val bold">Complimentary Pickup</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Official Signatures, Seal & Barcode Bar */}
              <div className="dossier-seal-section">
                <div className="dossier-sign-block">
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Customer / Buyer Signature</div>
                  <div className="dossier-sign-sub">{selectedBookingForView.buyerName}</div>
                </div>

                <div className="dossier-stamp-box">
                  <div className="dossier-stamp-seal">
                    <span>AGS GARDEN CITY</span>
                    <strong>OFFICIALLY SEALED</strong>
                    <span>CHENNAI • 2026</span>
                  </div>
                </div>

                <div className="dossier-sign-block">
                  <div className="dossier-sign-line"></div>
                  <div className="dossier-sign-title">Authorized Director Signature</div>
                  <div className="dossier-sign-sub">AGS Real Estate Developers Pvt Ltd</div>
                </div>
              </div>

              {/* Disclaimer & Verification Footnote */}
              <div className="dossier-footnote">
                <div className="dossier-barcode-text">
                  ||||| | |||| ||||| |||| || ||||| |||||| ||||| ||||||| {selectedBookingForView.bookingId} |||||
                </div>
                <p>
                  This computer-generated Dossier & Token Receipt is an authentic proof of reservation under AGS Garden City Real Estate protocols. 
                  Reconciled and stored in MongoDB "realestate" database.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
