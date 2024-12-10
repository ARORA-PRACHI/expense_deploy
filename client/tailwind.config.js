import twElements from 'tw-elements/dist/plugin'; // Import the plugin

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Include paths where Tailwind should look for classes
    './node_modules/tw-elements/dist/js/**/*.js', // Add tw-elements paths
  ],
  theme: {
    extend: {},
  },
  plugins: [
    twElements, // Use the imported plugin
  ],
};
