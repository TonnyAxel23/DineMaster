# 🍽️ DineMaster - Complete Restaurant Management System

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/dinemaster)
[![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4.svg)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1.svg)](https://mysql.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **DineMaster** is a complete, production-ready restaurant management system that combines a stunning customer-facing website with a powerful admin dashboard. Built with PHP, MySQL, HTML5, CSS3, and JavaScript, it handles online ordering, table reservations, menu management, and order tracking.

## ✨ Features

### 🏠 Customer Website
- **Modern, Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Interactive Menu** - Browse dishes by category with real-time filtering
- **Shopping Cart** - Add/remove items, update quantities, view total
- **Online Ordering** - Seamless checkout with delivery details and payment options
- **Table Reservations** - Book tables with date/time selection and availability checking
- **Live Table Availability** - Visual table map showing available/reserved tables
- **Order Tracking** - Track order status in real-time
- **Contact Page** - Phone, WhatsApp, Email, and Google Maps integration

### 👑 Admin Dashboard
- **Secure Authentication** - Login system with session management
- **Dashboard Overview** - Real-time statistics (orders, revenue, customers)
- **Order Management** - View all orders, update status (Pending → Preparing → Delivered)
- **Menu Management** - Add, edit, and delete menu items
- **Reservation Management** - View and manage table bookings
- **Customer Analytics** - Track customer order history and spending
- **Responsive Sidebar** - Clean, professional admin interface

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, flexbox, and grid
- **JavaScript (Vanilla)** - Interactive features, AJAX, and DOM manipulation
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Inter and Playfair Display typography

### Backend
- **PHP 7.4+** - Server-side logic and API endpoints
- **MySQL 5.7+** - Database management
- **PDO** - Secure database connections with prepared statements

### Server Requirements
- **XAMPP / WAMP / LAMP** - Local development environment
- **Apache** - Web server
- **MySQL** - Database server

## 📁 Project Structure

```
dinemaster/
├── index.html                 # Customer-facing homepage
├── admin/
│   ├── index.php             # Admin dashboard
│   ├── login.php             # Admin login page
│   └── logout.php            # Logout handler
├── api/
│   ├── auth.php              # Authentication API
│   ├── db_connect.php        # Database connection
│   ├── menu.php              # Menu CRUD operations
│   ├── order.php             # Order management
│   ├── reserve.php           # Reservation management
│   └── tables.php            # Table availability
├── database/
│   └── dinemaster.sql        # Database schema with sample data
├── uploads/                  # Food images storage
│   └── .htaccess            # Directory protection
└── README.md                # This file
```

## 🗄️ Database Schema

### Tables Overview
- **admins** - Admin users with hashed passwords
- **menu_items** - Restaurant menu with categories and pricing
- **orders** - Customer orders with status tracking
- **order_items** - Individual items within orders
- **reservations** - Table bookings with date/time
- **tables** - Restaurant tables with capacity and availability

### Sample Menu Items
- Nyama Choma (Grilled Meat) - KES 1,200
- Ugali na Sukuma Wiki - KES 450
- Chicken Pilau - KES 650
- Grilled Tilapia - KES 950
- Mandazi - KES 150
- Samosas - KES 250
- Fresh Mango Juice - KES 250
- Dawa Cocktail - KES 450

## 🛠️ Installation Guide

### Prerequisites
1. **XAMPP** (or equivalent) installed
2. PHP 7.4+ enabled
3. MySQL 5.7+ running

### Step-by-Step Setup

#### 1. Clone or Download the Project
```bash
git clone https://github.com/yourusername/dinemaster.git
# OR download and extract the ZIP file
```

#### 2. Move to XAMPP's htdocs folder
```bash
# Windows
C:\xampp\htdocs\dinemaster\

# Mac
/Applications/XAMPP/htdocs/dinemaster/

# Linux
/opt/lampp/htdocs/dinemaster/
```

#### 3. Start XAMPP Services
1. Open XAMPP Control Panel
2. Click **Start** for Apache
3. Click **Start** for MySQL

#### 4. Create the Database
1. Open browser and go to: `http://localhost/phpmyadmin`
2. Click **New** on the left sidebar
3. Enter database name: `dinemaster_db`
4. Select `utf8mb4_general_ci` as collation
5. Click **Create**
6. Click **Import** tab
7. Choose file: `database/dinemaster.sql`
8. Click **Go**

#### 5. Configure Database Connection
Open `api/db_connect.php` and verify credentials:
```php
$host = 'localhost';
$dbname = 'dinemaster_db';
$username = 'root';
$password = '';
```

#### 6. Access the Website
- **Customer Website:** `http://localhost/dinemaster/`
- **Admin Dashboard:** `http://localhost/dinemaster/admin/login.php`
- **Admin Credentials:** Username: `admin` | Password: `admin123`

## 📱 Features in Detail

### Customer Features

#### 🏠 Homepage
- Hero section with restaurant name and tagline
- "Reserve a Table" and "Order Now" CTAs
- Featured dishes display
- Customer testimonials
- About section

#### 🍽️ Menu
- Categorized dishes (Starters, Main Courses, Drinks, Desserts)
- Each dish includes:
  - High-quality image
  - Name and description
  - Price in Kenyan Shillings (KES)
  - "Add to Cart" button
- Category filtering

#### 🛒 Online Ordering
- Shopping cart sidebar
- Add/remove items
- Update quantities
- Real-time total calculation
- Checkout process:
  - Delivery information (name, phone, address)
  - Payment method selection (Cash on Delivery, M-Pesa, Card)
  - Order review and confirmation
- Order tracking with status updates

#### 📅 Table Reservations
- Reservation form with:
  - Customer name and phone
  - Date and time selection
  - Number of guests
  - Special requests
- Visual time slot selection
- Availability checking

#### 🪑 Table Management
- Visual table map
- Available/Reserved status
- Table capacity information
- Click to book functionality

#### 📦 Order Tracking
- Real-time order status tracking
- Progress steps: Placed → Preparing → Out for Delivery → Delivered
- Order details display
- Support contact information

### Admin Features

#### 📊 Dashboard
- Key metrics: Menu items, Total orders, Revenue, Pending orders
- Quick action buttons
- Recent orders list
- Real-time statistics

#### 📦 Order Management
- View all orders in a table
- Search and filter orders
- Update order status (Pending → Preparing → Delivered)
- View customer details

#### 🍽️ Menu Management
- Add new dishes
- Edit existing items
- Delete items
- Category management
- Price updates

#### 📅 Reservation Management
- View all bookings
- Confirm/Cancel reservations
- Customer contact information
- Date and time filtering

#### 👥 Customer Analytics
- Customer list with order history
- Total spending per customer
- Order frequency tracking
- Phone number grouping

## 🔒 Security Features

- **Prepared Statements** - Prevents SQL injection
- **Password Hashing** - Secure admin credentials
- **Session Management** - Protected admin routes
- **Input Validation** - Sanitizes user inputs
- **XSS Protection** - HTML escaping
- **HTACCESS** - Directory protection for uploads

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `index.html` and `admin/index.php`:
```css
:root {
    --gold: #FFD966;
    --dark: #0a0a0a;
    --dark-card: #141414;
    --border: #2a2a2a;
}
```

### Adding Menu Items
1. Via Admin Dashboard → Menu Management → Add New Dish
2. Or directly in database via phpMyAdmin

### Modifying Kenyan Currency
The system uses KES (Kenyan Shillings). To change:
```javascript
// In index.html - update the formatKES function
function formatKES(price) {
    return price.toLocaleString('en-KE');
}
```

## 📸 Screenshots

### Customer Website
- **Homepage:** Hero section with award badge and call-to-actions
- **Menu Page:** Categorized dishes with images and prices
- **Reservation Form:** Clean form with time slot selection
- **Table Availability:** Visual table map with status indicators
- **Order Tracking:** Progress steps with real-time updates

### Admin Dashboard
- **Login Page:** Secure authentication with glassmorphism design
- **Dashboard:** Real-time statistics and quick actions
- **Orders:** Manage orders with status updates
- **Menu:** Complete CRUD operations for dishes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

- **Design:** Custom design with inspiration from modern restaurant websites
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Inter, Playfair Display)
- **Images:** Pexels (free stock photos)

## 🐛 Troubleshooting

### PHP Code Displaying as Plain Text
- Ensure you're accessing via `http://localhost/...` not `file:///...`
- Check that Apache and PHP are running in XAMPP
- Verify file extension is `.php`

### Database Connection Error
- Start MySQL in XAMPP
- Check credentials in `api/db_connect.php`
- Verify database name is `dinemaster_db`

### Orders Not Showing in Admin
- Ensure `api/order.php` is working correctly
- Check database permissions
- Refresh the admin dashboard

### Admin Login Issues
- Default credentials: admin / admin123
- Check `admins` table in database
- Clear session cookies if stuck

## 📞 Support

For support, email: hello@dinemaster.co.ke

## 🙏 Acknowledgements

- XAMPP for local development
- PHP and MySQL communities
- All open-source contributors
- Pexels for beautiful food photography

---

**Built with ❤️ in Nairobi, Kenya**

[![Website](https://img.shields.io/badge/Website-dinemaster.co.ke-FFD966.svg)](https://dinemaster.co.ke)
[![Twitter](https://img.shields.io/badge/Twitter-@DineMaster-1DA1F2.svg)](https://twitter.com/DineMaster)
[![Instagram](https://img.shields.io/badge/Instagram-@DineMaster-E4405F.svg)](https://instagram.com/DineMaster)
