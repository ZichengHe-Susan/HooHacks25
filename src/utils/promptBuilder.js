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
  - A representative image (if available or you can suggest a placeholder) find images using the object title and artist
  - Notes for the teacher to help them prepare
  Respond in structured JSON format for easy parsing, strictly following the example structure below, but use this only as a reference. Do not include any other text or explanations outside of the JSON structure.
  { "schedule": [
    {
      "title": "Self-Portrait",
      "artist": "Vincent van Gogh",
      "description": "A self-portrait of the artist, showcasing his unique brushwork and color palette.",
      "location": "Gallery 825",
      "timeAllocated": 10,
      "imageURL": "https://www.vangoghmuseum.nl/en/collection/s0016V1962",
      "activity": "In pairs, students observe the emotions in Van Gogh’s brushstrokes. Then they share one word describing how it feels to look at this painting.",
      "notes": "Focus on self-awareness and expression through art."
    },
    {
      "title": "Water Lilies",
      "artist": "Claude Monet",
      "description": "A series of paintings depicting Monet's flower garden at Giverny, emphasizing light and color.",
      "location": "Gallery 818",
      "timeAllocated": 10,
      "imageURL": "https://www.slam.org/collection/objects/1930/",
      "activity": "Have students quietly observe the painting for 1 minute, then share how it makes them feel. Encourage them to describe the colors and shapes they notice.",
      "notes": "Tie in relaxation and the calming effect of water themes."
    },
  ]
}
  `;
  }