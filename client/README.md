
Project structure:

wedding-orders/
│
├── client/                # FRONTEND (React)
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── assets/        # სურათები, აიქონები, ფონტები
│       ├── components/    # Reusable კომპონენტები
│       │   ├── home/       # მხოლოდ Home-ს სექციები
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── OrderCard.jsx
│       │
│       ├── pages/         # გვერდები
│       │   ├── Home.jsx
│       │   ├── Orders.jsx
│       │   ├── OrderDetails.jsx
│       │   ├── Login.jsx
│       │   └── Admin.jsx
│       │
│       ├── services/      # API call-ები
│       │   └── api.js
│       │
│       ├── hooks/         # custom hooks
│       ├── context/       # auth / global state
│       ├── styles/        # CSS / Tailwind config
│       ├── App.jsx
│       └── main.jsx
│
├── server/                # BACKEND (Node + Express)
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── env.js
│   │
│   ├── models/            # DB მოდელები
│   │   ├── User.js
│   │   └── Order.js
│   │
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   └── order.routes.js
│   │
│   ├── controllers/       # ლოგიკა
│   │   ├── auth.controller.js
│   │   └── order.controller.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   └── package.json
│
├── .env
├── .gitignore
├── README.md
└── package.json





_____________hosting______________
	FRONDETN --> vercel 
	BACKEND --> Render



* Render:
	Free plan
	The server will “sleep” after 15–30 minutes of inactivity
	Wakes up 5–20 seconds on first request

	(But it's good for me.)




________ენდფოინთები_________

კაბების მართვა (Dresses):
	app.get('/api/dresses', ...): ბაზიდან ყველა კაბის წამოღება (ფასები, სურათები, ზომები). done

	app.get('/api/dresses/:id', ...): მხოლოდ ერთი, კონკრეტული კაბის დეტალების წამოღება. done

	app.post('/api/dresses', ...): ახალი კაბის დამატება ბაზაში (მხოლოდ შენთვის, ადმინისთვის). (ადმინ პანელში) done

	app.put('/api/dresses/:id', ...): კაბის ინფორმაციის განახლება (მაგ. ფასის შეცვლა). (ადმინ პანელში) done
 
	app.delete('/api/dresses/:id', ...): კაბის ამოშლა კატალოგიდან.  (ადმინ პანელში) done


/api/decorations/decorations

დეკორაციების მართვა (Decorations):
	app.get('/api/decorations', ...): ბაზიდან ყველა დეკორაციის წამოღება (ფასები, სურათები, ტიპები). done

	app.get('/api/decorations/:id', ...): მხოლოდ ერთი, კონკრეტული დეკორაციის დეტალების წამოღება. done

	app.post('/api/decorations', ...): ახალი დეკორაციის დამატება ბაზაში (მხოლოდ ადმინისთვის). (ადმინ პანელში) done

	app.put('/api/decorations/:id', ...): დეკორაციის ინფორმაციის განახლება (მაგ. ფასის შეცვლა). (ადმინ პანელში) done

	app.delete('/api/decorations/:id', ...): დეკორაციის ამოშლა კატალოგიდან. (ადმინ პანელში) done


ჯავშნები (Bookings):
	app.post('/api/bookings', ...): როცა კლიენტი აჭერს "დაჯავშნას", ეს მეთოდი ქმნის ახალ ჩანაწერს ბაზაში.

	app.get('/api/bookings', ...): ადმინისთვის, რომ დაინახოს ყველა შემოსული ჯავშანი. (ადმინ პანელში)

	app.patch('/api/bookings/:id', ...): სტატუსის შეცვლა (მაგალითად, "მოლოდინიდან" გადაყვანა "დადასტურებულზე").   (ადმინ პანელში)

ახალი API ენდპოინთები გადახდისთვის:
	POST /api/payments/create-order: აქ იქმნება გადახდის მოთხოვნა. ბექენდი უკავშირდება ბანკს, გადასცემს თანხას და ბანკი გვიბრუნებს სპეციალურ ბმულს (Checkout Link), სადაც მომხმარებელი ბარათის მონაცემებს შეიყვანს.

	GET /api/payments/callback: ეს არის "დამჭერი" ენდპოინთი. როცა მომხმარებელი გადაიხდის, ბანკი ამ მისამართზე აგზავნის სიგნალს: "გადახდა წარმატებულია" ან "გადახდა ჩავარდა".

	GET /api/payments/status/:orderId: ფრონტენდი ამოწმებს, დადასტურდა თუ არა გადახდა, რომ მომხმარებელს მადლობის გვერდი აჩვენოს.


____ადმინის ენდფოინთები___:
	GET /api/admin/revenue: ეს ენდპოინთი ბაზიდან ამოიღებს ყველა შეკვეთას, რომლის სტატუსიც არის "Paid" და დააჯამებს მათ ფასებს.
1. ინვენტარის მართვა (კაბები, დეკორაციები):
	ეს ენდპოინთები პასუხისმგებელია იმაზე, თუ რა დევს საიტზე გასაყიდად/გასაქირავებლად.

		POST /api/admin/dresses — ახალი კაბის დამატება (სახელი, ფასი, სურათი, ზომა).

		PUT /api/admin/dresses/:id — არსებული კაბის ინფორმაციის სრული განახლება.

		PATCH /api/admin/dresses/:id — კაბის მხოლოდ ერთი დეტალის შეცვლა (მაგ. მარტო ფასის ან ხელმისაწვდომობის).

		DELETE /api/admin/dresses/:id — კაბის წაშლა კატალოგიდან.

2. ჯავშნების მართვა (Bookings)
აქ აკონტროლებ, ვინ რა დაჯავშნა და რა ეტაპზეა პროცესი.

	GET /api/admin/bookings — ყველა მომხმარებლის ყველა ჯავშნის წამოღება (Filter: თარიღით, სტატუსით).

	PATCH /api/admin/bookings/:id/status — ჯავშნის სტატუსის შეცვლა (Pending -> Confirmed -> Completed ან Cancelled).

	DELETE /api/admin/bookings/:id — ჯავშნის წაშლა (თუ შეცდომითაა შეყვანილი).

3. ფინანსური ანალიტიკა (Revenue)
რაც წინა კითხვაში ახსენე – შემოსავლების კონტროლი.

	GET /api/admin/stats/total-revenue — ყველა დროის ჯამური შემოსავალი.

	GET /api/admin/stats/monthly-report — მიმდინარე თვის შემოსავალი და შეკვეთების რაოდენობა.

	GET /api/admin/stats/popular-items — სტატისტიკა: რომელი კაბა ან სერვისი ქირავდება ყველაზე ხშირად.

4. სერვისების და პორტფოლიოს მართვა
		POST /api/admin/portfolio — ახალი ფოტოების ატვირთვა "შესრულებული სამუშაოების" გალერეაში.

		DELETE /api/admin/portfolio/:id — ძველი ფოტოების წაშლა.

		PUT /api/admin/services/:id — სერვისების (ეფექტები, დიზაინი) აღწერის ან ფასის შეცვლა.