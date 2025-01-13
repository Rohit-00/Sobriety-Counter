import { Appearance } from "react-native";
const theme = {
    dark: {
      text: 'white',
      background: '#FBFBFB',
      primary: '#4DC591',
      secondary:'#FF7648'
    },
    light: {
      text: 'black',
      background: '#F8F9FA',
      primary: '#4DC591',
      secondary:'#FF7648'
    }
  };

const isDarkMode = Appearance.getColorScheme() === 'dark';
const colors = theme[isDarkMode ? 'dark' : 'light'];
export default colors