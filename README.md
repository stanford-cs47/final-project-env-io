# env.io

Link to Download: https://expo.io/@cade-stanford/Envio

Operating Instructions:
This prototype was developed using React Native and Expo. 
An iPhone 11 Pro Max was used as the basis for the styling.
The .zip file of theGitHub repository can be downloaded from our website. 
To run the app using Expo:
    1. Install the Expo app onto your phone from the App Store.
    2. Download the .zip file of the Env.io repository from our website.
    3. Unzip the file.
    4. Open your terminal.
    5. Type ​npm install exp --global​.
    6. Locate the directory where the file is, then ​cd​ into the directory ​env.io
    7. Type ​npm install​.
    8. Type ​exp start​ and scan the QR code printed in the terminal with your phone camera(make sure that your phone is unlocked and that your phone camera is a sufficientdistance from your computer screen to pick up the QR code), then click on the banner that pops up to open the app in Expo.  Alternatively: type ​exp start --send-toYourPhoneNumber​, where ​YourPhoneNumber​ is your 10-digit phone number(numbers only; no parentheses, dashes, etc.). If running using the phone number option,click on the link in the text message sent to your phone to open the app in Expo.
    9. The app should now be opened in Expo and display the login screen
        
    Troubleshooting: If you haven’t done so already, you may need to create an Expo accountand/or log in to Expo by running ​exp login​ in the terminal. Also, make sure that your phone is on the same Wi-Fi network as the computer you’re using, and if a red error message regardingthe bridge is displayed upon launching the app, you may need to repeatedly click “Reload” and wait for the JSBundle to build to 100%.

Limitations:
    Due to the time and resource constraints of this project, we had to simplify certain features:
    - None of the screens are fully styled to spec. with more time to really fine tune the styling, we could have definitely put together a more aesthetically pleasing product.
    - The garden is very limited and does not include the following due to time constraints:
        Rendering multiple plants in their correct location.
        Tracking plant state.
        Rendering a unique image for every plant.
    - The users on the community screen are hard coded, but I am proud to say that is the only hard-coded information in the app.
    - The actions and news articles that have already been claimed for gems are not tracked.
    - Last, but not least, an onboarding tutorial... Because every app could use this 
    (unless somehow our design is perfect)
    - There are also many more features we thought would be great to implement, but we knew they would be out of the scope of this class.
