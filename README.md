# HI Surf

<h2>Summary</h2>
<h4><a href="https://hi-surf.herokuapp.com/">HI Surf</a> is a surboard rental app designed to be used in the state of Hawaii. All users are able to either make a listing for their surfboard or request rentals of posted listings. The app uses a Python / Flask framework, with React and Redux.</h4>

<h2>How to use HI Surf</h2>
<p>Using HI Surf is designed to be intuitive. On the home page, all listings are displayed in a carousel. The sidebar on the left has links to the surfboard listing page of the boards you have posted `Listings` and the boards that you are renting `Rentals`. Also on the home page is a filter, which allows the user to specify which island they would like to rent a board from and/or the size of the board.</p>
<h1>IMAGE</h1>
<p>Users, regardless of login status are able to access all listings, but in order to rent a surfboard or post a listing, the user has to have an account.</p>
<h1>IMAGE</h1>
<p>If the user is logged in, the page of their listing would show the dates of all upcoming rentals of the surfboard listed. On the page of the surfboard that the user has rented or plans to rent, there is a requestal form and all dates that the user has requested to use this surfboard, as the user can reserve the board for more than one day. If a specified board is rented out for a day, no other user can reserve the board.</p>
<h1>IMAGES</h1>

<h2>How to Host HI Surf</h2>
<p>I have to preface this by saying that in order to run this app on your machine, you need to have a postgreSQL database and AWS S3 bucket in place, and have their information in a .env file (shown in the .env.example file in this repo). If you have those set, then you may run this app by:</p>
<ol>
   <li>Run <code>pipenv install</code></li>
   <li>Run <code>flask db init</code></li>
   <li>Run <code>flask db upgrade</code></li>
   <li>Run <code>flask run</code></li>
   <li>Navigate to /react-app from the root directory and run <code>npm install</code></li>
   <li>Run <code>npm start</code> from /react-app</li>
</ol>
