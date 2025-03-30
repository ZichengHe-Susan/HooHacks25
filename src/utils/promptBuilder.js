export function buildPrompt(data) {
    return `
  Create a personalized tour plan for a group of students.
  
  Age group: ${data.ageGroup}
  Language level: ${data.languageLevel}
  Background knowledge: ${data.background}
  Tour theme: ${data.theme}
  Museum name: ${data.museum}
  Total tour duration: ${data.totalTime} minutes
  
  The plan should include:
  - A list of 3–4 artworks or objects relevant to the theme and age group
  - Estimated time to spend at each object
  - The location of each object inside the museum (gallery names and floor numbers)
  - A brief description of the object
  - An activity the students can do to engage with the object
  - A representative image (if available or you can suggest a placeholder)
  
  Respond in structured JSON format for easy parsing.
  `;
  }