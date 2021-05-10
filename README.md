# GearWise

## Description

GearWise is an application for backpackers and campers to log and store their gear, record trips, and ensure that their load isn't too heavy to carry.

After a year of isolation and quarantine, many of us are itching to get outside and stretch our legs. GearWise will help users ensure that their trip is successful. Nothing ruins a trip quite like realizing you've forgotten something or that you're carrying more than you can handle.



[Deployed with Heroku](https://gear-wise.herokuapp.com/)

## Usage

### Navigation

Upon app launch, the user will arrive on the landing page (below). If the user does not have an account, they will fill out the form in the middle of the page to create one. If the user already has an account, they will fill out the account's email and password in the field on the top righthand corner of the page.

![GearWise Landing Page](public/images/screenshots/gearwise-landing-page.png?raw=true "A webpage with a green header and a background depicting a semi-opaque landscape of a mountain path")

Once the user has signed up or logged in, they are redirected to the dashboard (below). From the dashboard, the user will be able to create trips and add gear to their Gear Closet. The Gear Closet is a database of items that the user may pull from for each trip, rather than having to input the items again and again for each subsequent trip. See Functionality for more information about the Trip and Gear Closet forms. On the top left side are two buttons which read "Trips" and "New Trip". Clicking on the "New Trip" button will take the user to the dashboard; clicking the "Trips" button will take the user to the Trips page

![GearWise Dashboard](public/images/screenshots/gearwise-dash.png?raw=true "a webpage with a green header and a brown navbar. The body of the page is two submission tables entitled 'Fill your gear closet' and 'Start a new trip' as well as a field entitled 'My gear closet'")

The trips page (below) displays all the trips that the user has saved to the server as cards on the screen. The user may click on the card to display information about that specific trip

![GearWise Trips Page](public/images/screenshots/gearwise-trip-page.png?raw=true "a webpage with a green header and brown navbar. The body contains four gray cards on full display with a fifth partially obscured at the bottom of the image")

The trip details page (below) displays all the information about the trip that the user selected. From this screen, the user may add additional items to their closet, add items from the closet to their trip loadout (the items they will be taking with them), and convert various units of measure using a tool on the right side of the screen.

![GearWise Trip Details page](public/images/screenshots/gearwise-trip-details.png?raw=true "a webpage with a green header and brown navbar. The body contains A submission field entitled 'fill your gear closet' and a field entitled 'my gear closet' to the left, a textbox with a green title bar that reads 'trip to the park' and includes a variety of trip information as well as an empty field entitled 'trip loadout' in the middle, and black text displaying a weight as well as a small, gray, unit converter module to the right")

### Functionality

#### Adding Gear
To add a gear item to the gear closet, the user fills out the input fields and clicks the "add to closet" button. Note, the "Gear name" and "Weight" fields are required; if either field is left blank, the item will not be added to the bank. At the top of the form is a dropdown bar that allows the user to assign a category to their gear; the categories are:
* Shelter
* Sleep system
* Clothing
* Cooking/hhydration
* Safety/navigation
* Hygiene
* Electronics
* Miscellanious
The user may assign items to whichever category they like.

#### Adding a trip
To add a trip to the trips page, the user fills out the input fields and clicks the "save trip" button. All fields except for the "trip description" field are required. To enter the starting and ending dates, the user must enter the dates in a YYYY/MM/DD format, including the slashes.

#### Creating a trip loadout
To build a trip loadout, the user navigates to the trip details page from the trips page by clicking on a trip card. From there, the user can add any items from their gear closet to the trip loadout by clicking the black hiker icon on the right side of the gear item card.

## Contributors

* Leighton Albrecht
* Zachary Kathe
* Ty McFarland
* Amanda Nguyen

[Github repository](https://github.com/tylercmac/gear-tracker).