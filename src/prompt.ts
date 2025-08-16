export interface UserData{
    FullName?:String,
    Role?:String,
    PhoneNumber?:String,
    AlternateNumber?: String,
    City?:String,
    State?:String,
    Country?:String,
    Education?:String,
    Experience?:String,
    Skills?:String
}
export function pdfGenerationPrompt({
  FullName,
  Role,
  PhoneNumber,
  AlternateNumber,
  City,
  State,
  Country,
  Education,
  Experience,
  Skills,
}: UserData):string {

const prompt = `
Generate a single, complete HTML document for a professional resume.
The output must start directly with '<!DOCTYPE html>' and end with '</html>'. Do not include any text, comments, or code block delimiters (\`\`\`html\`) outside of the HTML document.
The resume should be visually distinct, fit on a single A4-size page, and change its layout and design on each generation.

Use the following information to populate the resume, only including a section if its data is provided:

${FullName ? `Full Name: ${FullName}` : ''}
${Role ? `Role: ${Role}` : ''}
${PhoneNumber ? `Primary Phone: ${PhoneNumber}` : ''}
${AlternateNumber ? `Alternate Phone: ${AlternateNumber}` : ''}
${
  City || State || Country
    ? `Location: ${[City, State, Country].filter(Boolean).join(', ')}`
    : ''
}

${
  Education
    ? `
Education: ${Education}
(Format this section with suitable headings and bullet points.)
`
    : ''
}
${
  Experience
    ? `
Experience: ${Experience}
(Format this section with suitable headings and bullet points for each job or project.)
`
    : ''
}
${
  Skills
    ? `
Skills: ${Skills}
(Categorize the skills and present them clearly, using bullet points or a similar list format.)
`
    : ''
}
`;

  return prompt;
}