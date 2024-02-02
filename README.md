This is a Pokemon search app forked based on the React Native Tutorial found at  https://www.sitepoint.com/getting-started-with-react-native/

<h2>Pre-requisites:</h2>

- `nodejs`
- `expo`

<h2>To run app:</h2>
NOTE for Windows: Need to do this in Powershell:

`npx expo start`

1) This should automatically start the app
2) Then press `w` for web and `a` for android
3) Then launch Expo Go app on android and scan using the QRCode
4) Note: May need to remove things that are not supported by android, like <b> or <br> basic html stuff

<h2>My own additions:</h2>

- Added keyboard listener when Enter is pressed in search box (works on web only)
- Switched expo to typescript & added a Typeahead component for search
