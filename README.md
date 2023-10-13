# Mental Health Support Web App

## Overview
A comprehensive web application that offers resources and tools to aid users in managing their mental health and wellbeing. Created as part of CS-545, this application emphasizes user interaction, support, and education.

## Features

- **Homepage**: Overview of available features.
- **Mood Journal**: Mood tracking, journaling with data visualization.
- **Support Circles**: Virtual peer support groups with text moderation, suicide prevention, and abuse prevention measures.
- **Peer Chat**: Forums for peer support and shared experiences.
- **Memory Booster**: Interactive game to boost memory and focus.
- **Creative Canvas**: Therapeutic art tool for expression and stress relief.
- **Coping Toolbox**: Resources on coping mechanisms for managing stress and anxiety.
- **CBT Fundamentals**: Introduction to cognitive-behavioral therapy techniques.
- **Goal Planner**: Personalized goal setting and progress tracking.
- **Wellness Quiz**: Mental health self-assessment tools and quizzes.
- **Habit Organizer**: Habit management and tracking.
- **Mindful Meditation**: Guided meditations and mindfulness practices.
- **AI Counselor**: 24/7 AI chatbot support for coping and self-care.
- **Survey**: Participate in mental health-related surveys.
- **Dark Mode**, **Email Notifications**, **Push Notifications**.

## Technologies

- **React**: Frontend framework.
- **Firebase**: Backend database, authentication, and more.
- **Redux**: State management.
- **Framer Motion**: For animations.
- **Material UI**: UI component library.
  
### Backend for AI Chatbot & Peer Chat Moderation

The chatbot leverages the power of OpenAI for 24/7 support and assistance. The peer chat feature also integrates a moderation server for enhanced user safety. Find more details [here](https://github.com/hppanpaliya/openai-text-moderation-server).

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hppanpaliya/CS-545-Mental-Health-Support/
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

## Code Overview

The app is structured with various components:

- **`App.js`**: Handles themes, routes, and authentication.
- **`store`**: Redux store and slices for state management.
- Sub-folders in **`components`**: Different features like Mood Tracker, Peer Chat, Goal Planner, etc.
- **`utils`**: Helper functions, Firebase setup, and more.

## Contributing

Your contributions are always welcome! Open an issue for bugs or feature requests and feel free to submit pull requests.

## License

This project is under the [MIT License](https://opensource.org/licenses/MIT). See [LICENSE](LICENSE) for more details.
