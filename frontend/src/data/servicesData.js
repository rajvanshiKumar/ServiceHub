export const categories = [
  { icon: '🎓', label: 'Education & Tutoring', value: 'education' },
  { icon: '🔧', label: 'Repair & Maintenance', value: 'repair' },
  { icon: '❤️', label: 'Health', value: 'health' },
  { icon: '🎉', label: 'Event Planning', value: 'event' },
  { icon: '🧹', label: 'Home Cleaning', value: 'cleaning' },
];

export const categoryColors = {
  education: '#6c63ff',
  repair: '#f77f00',
  health: '#2dc653',
  event: '#e94560',
  cleaning: '#00b4d8',
};

export const services = [
  // ─── EDUCATION ───────────────────────────────────────────────
  {
    id: 1, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Python Full Stack', facilityName: 'CodeCraft Academy',
    title: 'Python Full Stack – Beginner to Pro',
    description: 'Master Python, Django, REST APIs and React from scratch with 50+ real projects.',
    price: '₹499', location: 'Hyderabad', rating: 4.9, reviews: 1298,
    experience: '20 Years', students: 12400, duration: '6 Months',
    provider: 'K.V.Rao', providerTitle: 'Senior Python Developer',
    highlights: ['Django REST Framework', 'React Integration', 'Deployment on AWS', 'Live Projects'],
    performance: 95, about: 'Sumit has trained 1200+ students in full stack Python development with a 95% placement rate.'
  },
  {
    id: 2, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Python Full Stack', facilityName: 'TechVision Institute',
    title: 'Advanced Python & Machine Learning',
    description: 'Deep dive into Python, ML algorithms, Pandas, NumPy and model deployment.',
    price: '₹799', location: 'Bangalore', rating: 4.8, reviews: 94,
    experience: '7 Years', students: 980, duration: '4 Months',
    provider: 'Satish Gupta', providerTitle: 'ML Engineer at Google',
    highlights: ['Scikit-learn', 'TensorFlow Basics', 'Flask APIs', 'Model Deployment'],
    performance: 92, about: 'Vinit brings industry-level ML expertise with hands-on real-world datasets.'
  },
  {
    id: 3, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Python Full Stack', facilityName: 'StackBuilder Labs',
    title: 'Python Django E-Commerce Project',
    description: 'Build a complete e-commerce platform using Django, PostgreSQL and Stripe.',
    price: '₹1', location: 'Netherland', rating: 5, reviews: 100,
    experience: '4 Years', students: 650, duration: '3 Months',
    provider: 'Guido van rossum', providerTitle: 'Django Specialist',
    highlights: ['Django ORM', 'Payment Gateway', 'Admin Panel', 'REST APIs'],
    performance: 89, about: 'Rahul specializes in production-ready Django applications.'
  },
  {
    id: 4, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Python Full Stack', facilityName: 'DataEdge Learning',
    title: 'Python for Data Science & Analytics',
    description: 'Learn data wrangling, visualization, statistics and dashboards using Python.',
    price: '₹599', location: 'Pune', rating: 4.9, reviews: 110,
    experience: '6 Years', students: 1100, duration: '5 Months',
    provider: 'Sneha Iyer', providerTitle: 'Data Scientist',
    highlights: ['Pandas', 'Matplotlib', 'Power BI Integration', 'SQL + Python'],
    performance: 94, about: 'Sneha simplifies complex data concepts for absolute beginners.'
  },
  {
    id: 5, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Python Full Stack', facilityName: 'AutoScript Hub',
    title: 'Python Automation & Scripting',
    description: 'Automate repetitive tasks using Python scripts, Selenium and web scraping.',
    price: '₹399', location: 'Remote', rating: 4.6, reviews: 58,
    experience: '3 Years', students: 430, duration: '2 Months',
    provider: 'Amit Rao', providerTitle: 'Python Automation Expert',
    highlights: ['Selenium', 'BeautifulSoup', 'Task Scheduling', 'Excel Automation'],
    performance: 87, about: 'Amit helps professionals save hours with smart automation scripts.'
  },
  {
    id: 6, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Java Full Stack', facilityName: 'JavaPro Academy',
    title: 'Java Full Stack – Spring Boot & React',
    description: 'Complete Java full stack with Spring Boot, Hibernate, MySQL and React.js.',
    price: '₹899', location: 'Bangalore', rating: 4.9, reviews: 142,
    experience: '8 Years', students: 1500, duration: '7 Months',
    provider: 'Harishankar sir', providerTitle: 'Java Architect',
    highlights: ['Spring Boot', 'Hibernate ORM', 'Microservices', 'React Frontend'],
    performance: 96, about: 'Vikram has been building enterprise Java applications for 8+ years.'
  },
  {
    id: 7, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Java Full Stack', facilityName: 'CoreJava Institute',
    title: 'Core Java to Advanced – Complete Guide',
    description: 'OOPs, Collections, Multithreading, JDBC and design patterns covered deeply.',
    price: '₹549', location: 'Hyderabad', rating: 4.7, reviews: 88,
    experience: '5 Years', students: 870, duration: '4 Months',
    provider: 'Deepa Nair', providerTitle: 'Senior Java Developer',
    highlights: ['OOPs Concepts', 'Collections Framework', 'Multithreading', 'Design Patterns'],
    performance: 91, about: 'Deepa makes Java fundamentals crystal clear for beginners.'
  },
  {
    id: 8, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Java Full Stack', facilityName: 'CloudStack Training',
    title: 'Java Microservices with Docker & Kubernetes',
    description: 'Build, containerize and deploy Java microservices with Docker and K8s.',
    price: '₹1199', location: 'Chennai', rating: 4.8, reviews: 67,
    experience: '9 Years', students: 520, duration: '5 Months',
    provider: 'Karthik Raj', providerTitle: 'DevOps & Java Expert',
    highlights: ['Spring Cloud', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
    performance: 93, about: 'Karthik bridges Java backend and modern DevOps practices.'
  },
  {
    id: 9, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Java Full Stack', facilityName: 'EnterpriseCode School',
    title: 'Java + Angular Enterprise App',
    description: 'Build enterprise-level apps using Java backend with Angular frontend.',
    price: '₹999', location: 'Mumbai', rating: 4.6, reviews: 54,
    experience: '6 Years', students: 460, duration: '6 Months',
    provider: 'Rohan Gupta', providerTitle: 'Full Stack Java Engineer',
    highlights: ['Angular 16', 'JWT Auth', 'Spring Security', 'REST APIs'],
    performance: 88, about: 'Rohan focuses on real enterprise-grade application architecture.'
  },
  {
    id: 10, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Java Full Stack', facilityName: 'CrackCode Bootcamp',
    title: 'Java Interview Preparation Bootcamp',
    description: '500+ coding questions, DSA, system design and mock interview sessions.',
    price: '₹699', location: 'Online', rating: 4.9, reviews: 201,
    experience: '7 Years', students: 2100, duration: '3 Months',
    provider: 'Ananya Das', providerTitle: 'FAANG Interview Coach',
    highlights: ['DSA in Java', 'System Design', 'Mock Interviews', 'LeetCode Patterns'],
    performance: 97, about: 'Ananya has helped 2000+ students crack top product companies.'
  },
  {
    id: 11, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: '.Net Full Stack', facilityName: 'DotNet Masters',
    title: '.NET Full Stack with C# & Angular',
    description: 'Build enterprise apps using ASP.NET Core, Entity Framework and Angular.',
    price: '₹849', location: 'Pune', rating: 4.8, reviews: 73,
    experience: '7 Years', students: 680, duration: '6 Months',
    provider: 'Manish Tiwari', providerTitle: '.NET Solutions Architect',
    highlights: ['ASP.NET Core', 'Entity Framework', 'Angular', 'Azure Deployment'],
    performance: 92, about: 'Manish builds scalable enterprise .NET solutions for Fortune 500 clients.'
  },
  {
    id: 12, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: '.Net Full Stack', facilityName: 'SharpCode Academy',
    title: 'C# Advanced Programming & LINQ',
    description: 'Deep dive into C# generics, LINQ, async/await and design patterns.',
    price: '₹649', location: 'Delhi', rating: 4.7, reviews: 49,
    experience: '5 Years', students: 390, duration: '3 Months',
    provider: 'Ritu Sharma', providerTitle: 'C# Specialist',
    highlights: ['LINQ Queries', 'Async Programming', 'Design Patterns', 'Unit Testing'],
    performance: 89, about: 'Ritu makes advanced C# topics approachable with practical examples.'
  },
  {
    id: 13, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: '.Net Full Stack', facilityName: 'APIForge Institute',
    title: '.NET Web API with SQL Server',
    description: 'Create production-ready REST APIs using .NET 7 and SQL Server.',
    price: '₹749', location: 'Hyderabad', rating: 4.6, reviews: 38,
    experience: '4 Years', students: 310, duration: '2 Months',
    provider: 'Suresh Kumar', providerTitle: 'Backend .NET Developer',
    highlights: ['REST API Design', 'SQL Server', 'Swagger', 'Authentication'],
    performance: 86, about: 'Suresh focuses on clean API architecture with best practices.'
  },
  {
    id: 14, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Web Development', facilityName: 'WebCraft Institute',
    title: 'Complete Web Dev Bootcamp – HTML to React',
    description: 'From HTML/CSS basics to React.js, Node.js and full stack web development.',
    price: '₹999', location: 'Bangalore', rating: 4.9, reviews: 185,
    experience: '6 Years', students: 1800, duration: '8 Months',
    provider: 'Sudhakar Sharma', providerTitle: 'Full Stack Web Developer',
    highlights: ['HTML/CSS/JS', 'React.js', 'Node.js', 'MongoDB'],
    performance: 95, about: 'Neha has trained 1800+ web developers with industry-level projects.'
  },
  {
    id: 15, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Web Development', facilityName: 'ReactPro School',
    title: 'Advanced React.js & Redux Mastery',
    description: 'Master React hooks, context, Redux Toolkit, and performance optimization.',
    price: '₹699', location: 'Remote', rating: 4.8, reviews: 112,
    experience: '5 Years', students: 960, duration: '3 Months',
    provider: 'Siva kumar', providerTitle: 'React Specialist',
    highlights: ['React Hooks', 'Redux Toolkit', 'React Query', 'Testing'],
    performance: 93, about: 'Aditya builds high-performance React applications used by millions.'
  },
  {
    id: 16, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Web Development', facilityName: 'NodeNest Academy',
    title: 'Node.js & Express Backend Development',
    description: 'Build scalable REST APIs, authentication and real-time apps with Node.js.',
    price: '₹799', location: 'Mumbai', rating: 4.7, reviews: 84,
    experience: '4 Years', students: 720, duration: '4 Months',
    provider: 'Pallavi Singh', providerTitle: 'Node.js Backend Expert',
    highlights: ['Express.js', 'JWT Auth', 'Socket.io', 'MongoDB'],
    performance: 90, about: 'Pallavi specializes in real-time and scalable backend systems.'
  },
  {
    id: 17, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Web Development', facilityName: 'PixelFlow Design School',
    title: 'Responsive Web Design with Bootstrap 5',
    description: 'Create stunning responsive websites using Bootstrap 5 and modern CSS.',
    price: '₹399', location: 'Hyderabad', rating: 4.6, reviews: 66,
    experience: '3 Years', students: 540, duration: '2 Months',
    provider: 'Kavya Reddy', providerTitle: 'UI Developer',
    highlights: ['Bootstrap 5', 'Flexbox', 'CSS Grid', 'Animations'],
    performance: 87, about: 'Kavya creates pixel-perfect, responsive interfaces with clean code.'
  },
  {
    id: 18, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'App Development', facilityName: 'FlutterNest Academy',
    title: 'Flutter & Dart – Cross Platform Apps',
    description: 'Build beautiful iOS and Android apps from scratch using Flutter.',
    price: '₹899', location: 'Bangalore', rating: 4.9, reviews: 97,
    experience: '5 Years', students: 830, duration: '5 Months',
    provider: 'Siddharth Rao', providerTitle: 'Flutter Developer',
    highlights: ['Dart Language', 'Flutter Widgets', 'Firebase', 'App Store Deploy'],
    performance: 94, about: 'Siddharth has published 15+ Flutter apps on Play Store and App Store.'
  },
  {
    id: 19, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'App Development', facilityName: 'MobileFirst Institute',
    title: 'React Native Mobile Development',
    description: 'Create cross-platform mobile apps using React Native and Expo.',
    price: '₹799', location: 'Chennai', rating: 4.7, reviews: 72,
    experience: '4 Years', students: 610, duration: '4 Months',
    provider: 'Meera Krishnan', providerTitle: 'React Native Developer',
    highlights: ['React Native', 'Expo', 'Navigation', 'Push Notifications'],
    performance: 91, about: 'Meera bridges web and mobile development with React Native expertise.'
  },
  {
    id: 20, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'App Development', facilityName: 'KotlinCraft School',
    title: 'Android App Development with Kotlin',
    description: 'Build native Android apps using Kotlin, Jetpack Compose and Firebase.',
    price: '₹749', location: 'Hyderabad', rating: 4.8, reviews: 85,
    experience: '6 Years', students: 710, duration: '5 Months',
    provider: 'Aarav Mehta', providerTitle: 'Android Developer',
    highlights: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Firebase'],
    performance: 93, about: 'Aarav creates production-ready native Android apps with clean architecture.'
  },
  {
    id: 21, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Graphic Design', facilityName: 'DesignForge Studio',
    title: 'UI/UX Design with Figma – Complete Course',
    description: 'Learn UI/UX design principles, wireframing and prototyping in Figma.',
    price: '₹749', location: 'Pune', rating: 4.9, reviews: 103,
    experience: '5 Years', students: 920, duration: '4 Months',
    provider: 'Ishaan Kapoor', providerTitle: 'UI/UX Designer at Swiggy',
    highlights: ['Figma', 'Design Systems', 'Prototyping', 'Usability Testing'],
    performance: 95, about: 'Ishaan has designed products used by millions across India.'
  },
  {
    id: 22, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Graphic Design', facilityName: 'AdobePro Creative Hub',
    title: 'Adobe Photoshop & Illustrator Mastery',
    description: 'Master photo editing, logo design and digital art with Adobe tools.',
    price: '₹599', location: 'Delhi', rating: 4.7, reviews: 68,
    experience: '4 Years', students: 560, duration: '3 Months',
    provider: 'Tanvi Shah', providerTitle: 'Visual Designer',
    highlights: ['Photoshop', 'Illustrator', 'Logo Design', 'Brand Identity'],
    performance: 88, about: 'Tanvi brings creative visual storytelling through graphic design.'
  },
  {
    id: 23, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Graphic Design', facilityName: 'MotionLab Institute',
    title: 'Motion Graphics & Video Editing',
    description: 'Create stunning animations and videos using After Effects and Premiere Pro.',
    price: '₹849', location: 'Mumbai', rating: 4.8, reviews: 59,
    experience: '6 Years', students: 480, duration: '4 Months',
    provider: 'Rajan Pillai', providerTitle: 'Motion Designer',
    highlights: ['After Effects', 'Premiere Pro', '2D Animation', 'Color Grading'],
    performance: 91, about: 'Rajan creates award-winning motion graphics for top brands.'
  },
  {
    id: 24, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Cybersecurity', facilityName: 'SecureNet Academy',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Learn CEH-level ethical hacking, network security and vulnerability testing.',
    price: '₹1299', location: 'Bangalore', rating: 4.9, reviews: 89,
    experience: '8 Years', students: 740, duration: '6 Months',
    provider: 'Nikhil Bose', providerTitle: 'Certified Ethical Hacker',
    highlights: ['Kali Linux', 'Metasploit', 'Network Scanning', 'Web App Hacking'],
    performance: 96, about: 'Nikhil is a certified ethical hacker and security consultant.'
  },
  {
    id: 25, category: 'Education & Tutoring', categoryValue: 'education',
    subcategory: 'Cybersecurity', facilityName: 'CyberShield Training',
    title: 'Cybersecurity Fundamentals & SOC Analyst',
    description: 'Master SOC operations, SIEM tools, threat detection and incident response.',
    price: '₹999', location: 'Hyderabad', rating: 4.7, reviews: 54,
    experience: '5 Years', students: 430, duration: '4 Months',
    provider: 'Swati Jain', providerTitle: 'SOC Analyst & Trainer',
    highlights: ['SIEM Tools', 'Threat Detection', 'Incident Response', 'Compliance'],
    performance: 90, about: 'Swati trains cybersecurity professionals for enterprise SOC environments.'
  },

  // ─── REPAIR & MAINTENANCE ─────────────────────────────────────
  {
    id: 26, category: 'Repair & Maintenance', categoryValue: 'repair',
    subcategory: 'Appliance Repair', facilityName: 'FixIt Home Services',
    title: 'AC, Refrigerator & Washing Machine Repair',
    description: 'Expert technician for all major home appliance repairs at your doorstep.',
    price: '₹299', location: 'Hyderabad', rating: 4.7, reviews: 210,
    experience: '10 Years', students: null, duration: 'Same Day',
    provider: 'Ramesh Kumar', providerTitle: 'Certified Appliance Technician',
    highlights: ['All Brands', 'Doorstep Service', 'Warranty on Repair', '24/7 Available'],
    performance: 94, about: 'Ramesh has repaired 5000+ appliances across Hyderabad with 94% satisfaction.'
  },
  {
    id: 27, category: 'Repair & Maintenance', categoryValue: 'repair',
    subcategory: 'Vehicle Services', facilityName: 'DriveEase Garage',
    title: 'Bike & Car Service at Home',
    description: 'Doorstep vehicle servicing, oil change, battery check and minor repairs.',
    price: '₹499', location: 'Bangalore', rating: 4.6, reviews: 145,
    experience: '8 Years', students: null, duration: '2-3 Hours',
    provider: 'Sunil Mechanic', providerTitle: 'Automotive Service Expert',
    highlights: ['Oil Change', 'Battery Service', 'Brake Check', 'All Vehicles'],
    performance: 91, about: 'Sunil brings professional vehicle servicing right to your doorstep.'
  },
  {
    id: 28, category: 'Repair & Maintenance', categoryValue: 'repair',
    subcategory: 'Painting & Renovation', facilityName: 'ColorCraft Painters',
    title: 'Interior & Exterior Wall Painting',
    description: 'Professional painters for homes, offices and commercial spaces.',
    price: '₹799', location: 'Mumbai', rating: 4.8, reviews: 98,
    experience: '12 Years', students: null, duration: '1-3 Days',
    provider: 'Prakash Painter', providerTitle: 'Master Painter',
    highlights: ['All Paint Types', 'Surface Prep', 'Clean Work', 'Free Estimate'],
    performance: 92, about: 'Prakash delivers flawless finishes for homes and commercial spaces.'
  },
  {
    id: 29, category: 'Repair & Maintenance', categoryValue: 'repair',
    subcategory: 'Electronics Repair', facilityName: 'TechFix Solutions',
    title: 'Laptop, Mobile & TV Repair',
    description: 'Quick repair of laptops, smartphones, tablets and flat screen TVs.',
    price: '₹199', location: 'Delhi', rating: 4.5, reviews: 176,
    experience: '6 Years', students: null, duration: 'Same Day',
    provider: 'Ajay Electronics', providerTitle: 'Electronics Repair Specialist',
    highlights: ['All Brands', 'Screen Replacement', 'Data Recovery', 'Warranty'],
    performance: 88, about: 'Ajay fixes all electronics quickly with genuine spare parts.'
  },

  // ─── HEALTH ──────────────────────────────────────────────────
  {
    id: 30, category: 'Health', categoryValue: 'health',
    subcategory: 'Gym & Strength', facilityName: 'IronForge Fitness',
    title: 'Strength Training & Muscle Building Program',
    description: 'Customized gym program for muscle gain, strength and body transformation.',
    price: '₹1499', location: 'Hyderabad', rating: 4.9, reviews: 134,
    experience: '8 Years', students: 980, duration: '3 Months',
    provider: 'Rohit Fitness', providerTitle: 'Certified Strength Coach',
    highlights: ['Custom Workout Plan', 'Diet Chart', 'Weekly Check-in', 'Supplement Guide'],
    performance: 96, about: 'Rohit has transformed 900+ physiques with science-backed training.'
  },
  {
    id: 31, category: 'Health', categoryValue: 'health',
    subcategory: 'Yoga & Wellness', facilityName: 'ZenFlow Yoga Studio',
    title: 'Morning Yoga & Mindfulness Sessions',
    description: 'Daily yoga, breathing exercises and meditation for mind-body balance.',
    price: '₹799', location: 'Pune', rating: 4.8, reviews: 112,
    experience: '10 Years', students: 1200, duration: 'Ongoing',
    provider: 'Divya Yoga', providerTitle: 'Certified Yoga Instructor',
    highlights: ['Hatha Yoga', 'Pranayama', 'Meditation', 'Flexibility Training'],
    performance: 95, about: 'Divya has guided 1200+ students to better health through yoga.'
  },
  {
    id: 32, category: 'Health', categoryValue: 'health',
    subcategory: 'Cardio Fitness', facilityName: 'BurnZone Cardio Center',
    title: 'HIIT & Cardio Weight Loss Program',
    description: 'High-intensity interval training designed for rapid fat loss and stamina.',
    price: '₹999', location: 'Mumbai', rating: 4.7, reviews: 88,
    experience: '5 Years', students: 760, duration: '2 Months',
    provider: 'Sneha Cardio', providerTitle: 'Cardio & HIIT Specialist',
    highlights: ['HIIT Workouts', 'Calorie Tracking', 'Stamina Building', 'Online Sessions'],
    performance: 92, about: 'Sneha helps clients lose weight safely and sustainably.'
  },
  {
    id: 33, category: 'Health', categoryValue: 'health',
    subcategory: 'Personal Trainer', facilityName: 'EliteBody Training',
    title: 'One-on-One Personal Fitness Training',
    description: 'Dedicated personal trainer for home or gym sessions, tailored to your goals.',
    price: '₹1999', location: 'Bangalore', rating: 4.9, reviews: 67,
    experience: '7 Years', students: 420, duration: 'Flexible',
    provider: 'Arun PT', providerTitle: 'Celebrity Personal Trainer',
    highlights: ['Goal Setting', 'Nutrition Plan', 'Progress Tracking', 'Home/Gym'],
    performance: 97, about: 'Arun trains celebrities and athletes with personalized fitness plans.'
  },
  {
    id: 34, category: 'Health', categoryValue: 'health',
    subcategory: 'Physiotherapy', facilityName: 'HealWell Physio Clinic',
    title: 'Back Pain & Injury Rehabilitation',
    description: 'Professional physiotherapy for back pain, joint injuries and post-surgery recovery.',
    price: '₹1299', location: 'Hyderabad', rating: 4.8, reviews: 94,
    experience: '9 Years', students: null, duration: '4-6 Weeks',
    provider: 'Dr. Meera PT', providerTitle: 'Licensed Physiotherapist',
    highlights: ['Pain Assessment', 'Exercise Therapy', 'Home Visits', 'Recovery Plan'],
    performance: 94, about: 'Dr. Meera has treated 800+ patients with back and joint conditions.'
  },
  {
    id: 35, category: 'Health', categoryValue: 'health',
    subcategory: 'Sports Training', facilityName: 'ChampionEdge Sports',
    title: 'Cricket & Football Sports Coaching',
    description: 'Professional sports coaching for cricket, football and athletics by ex-players.',
    price: '₹1199', location: 'Chennai', rating: 4.7, reviews: 56,
    experience: '12 Years', students: 340, duration: '3 Months',
    provider: 'Coach Vijay', providerTitle: 'Ex-Ranji Cricketer & Coach',
    highlights: ['Batting/Bowling', 'Fitness Drills', 'Match Strategy', 'Nutrition'],
    performance: 91, about: 'Coach Vijay trains youth athletes for state and national level competitions.'
  },

  // ─── EVENT PLANNING ──────────────────────────────────────────
  {
    id: 36, category: 'Event Planning', categoryValue: 'event',
    subcategory: 'Wedding Planning', facilityName: 'Royal Celebrations',
    title: 'Complete Wedding Planning & Management',
    description: 'End-to-end wedding planning from venue selection to day-of coordination.',
    price: '₹49999', location: 'Jaipur', rating: 5.0, reviews: 87,
    experience: '10 Years', students: null, duration: '3-6 Months',
    provider: 'Royal Events', providerTitle: 'Luxury Wedding Planner',
    highlights: ['Venue Selection', 'Catering', 'Decoration', 'Photography Coord.'],
    performance: 98, about: 'Royal Events has planned 200+ weddings across Rajasthan and Delhi.'
  },
  {
    id: 37, category: 'Event Planning', categoryValue: 'event',
    subcategory: 'Birthday & Party Planning', facilityName: 'Party Magic Events',
    title: 'Birthday & Theme Party Organizer',
    description: 'Creative themed birthday parties for kids and adults with full decoration.',
    price: '₹9999', location: 'Mumbai', rating: 4.8, reviews: 143,
    experience: '6 Years', students: null, duration: '1 Day',
    provider: 'Party Magic', providerTitle: 'Event Decorator & Organizer',
    highlights: ['Theme Setup', 'Cake Arrangement', 'Entertainment', 'Photography'],
    performance: 94, about: 'Party Magic creates unforgettable birthday memories for all ages.'
  },
  {
    id: 38, category: 'Event Planning', categoryValue: 'event',
    subcategory: 'Corporate Events', facilityName: 'BizEvents Pro',
    title: 'Corporate Conference & Team Events',
    description: 'Professional management of corporate conferences, seminars and team outings.',
    price: '₹29999', location: 'Bangalore', rating: 4.9, reviews: 62,
    experience: '8 Years', students: null, duration: 'Custom',
    provider: 'BizEvents Pro', providerTitle: 'Corporate Event Manager',
    highlights: ['AV Setup', 'Catering', 'Guest Management', 'Virtual Events'],
    performance: 96, about: 'BizEvents Pro has managed events for 100+ Fortune 500 companies.'
  },
  {
    id: 39, category: 'Event Planning', categoryValue: 'event',
    subcategory: 'Decoration Services', facilityName: 'Bloom Decor Studio',
    title: 'Floral & Stage Decoration Services',
    description: 'Stunning floral arrangements and stage setups for all events.',
    price: '₹7999', location: 'Hyderabad', rating: 4.7, reviews: 98,
    experience: '7 Years', students: null, duration: '1 Day',
    provider: 'Bloom Decor', providerTitle: 'Floral Designer',
    highlights: ['Floral Arrangements', 'Stage Setup', 'Backdrop Design', 'Table Decor'],
    performance: 93, about: 'Bloom Decor transforms any venue into a visual masterpiece.'
  },

  // ─── HOME CLEANING ───────────────────────────────────────────
  {
    id: 40, category: 'Home Cleaning', categoryValue: 'cleaning',
    subcategory: 'Home Cleaning', facilityName: 'CleanHome Pro',
    title: 'Regular Home Cleaning Service',
    description: 'Weekly or monthly professional home cleaning with eco-friendly products.',
    price: '₹399', location: 'Hyderabad', rating: 4.6, reviews: 189,
    experience: '5 Years', students: null, duration: '3-4 Hours',
    provider: 'CleanHome Pro', providerTitle: 'Professional Cleaning Team',
    highlights: ['Eco Products', 'Trained Staff', 'Flexible Schedule', 'Insured'],
    performance: 90, about: 'CleanHome Pro maintains 500+ homes across Hyderabad with 4.6★ rating.'
  },
  {
    id: 41, category: 'Home Cleaning', categoryValue: 'cleaning',
    subcategory: 'Deep Cleaning', facilityName: 'DeepClean India',
    title: 'Deep Cleaning & Sanitization Package',
    description: 'Full deep cleaning of kitchen, bathrooms, bedrooms and complete sanitization.',
    price: '₹1299', location: 'Mumbai', rating: 4.8, reviews: 134,
    experience: '7 Years', students: null, duration: '6-8 Hours',
    provider: 'DeepClean India', providerTitle: 'Sanitization Specialist',
    highlights: ['Chemical Disinfection', 'Kitchen Degreasing', 'Bathroom Descaling', 'Post-Clean Inspection'],
    performance: 93, about: 'DeepClean India delivers hospital-grade sanitization for homes.'
  },
  {
    id: 42, category: 'Home Cleaning', categoryValue: 'cleaning',
    subcategory: 'Water Tank & Drain Cleaning', facilityName: 'AquaClean Services',
    title: 'Water Tank & Drain Pipe Cleaning',
    description: 'Professional water tank cleaning and drain unclogging for homes and societies.',
    price: '₹599', location: 'Delhi', rating: 4.5, reviews: 76,
    experience: '8 Years', students: null, duration: '2-3 Hours',
    provider: 'AquaClean Services', providerTitle: 'Water & Drain Specialist',
    highlights: ['Tank Disinfection', 'Drain Unclogging', 'Society Packages', 'Certificate'],
    performance: 88, about: 'AquaClean ensures safe drinking water and clear drainage systems.'
  },
];