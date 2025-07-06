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
  let prompt = `You need to return html just html not wrapped in string for resume, according to the details provided by user.
    The full name of the user is ${FullName}, his/her role is ${Role}, user has also provided its contact number that is ${PhoneNumber},
    `;
  if (AlternateNumber) {
    prompt += `User has also provided its Alternate Contact Number that is ${AlternateNumber}.`;
  }

  if (City) {
    prompt += `The City where user currently resides is ${City}.`;
  }

  if (State) {
    prompt += `The State where user currently resides is ${State}.`;
  }

  if (Country) {
    prompt += `The Country where user currently resides is ${Country}.`;
  }

  if (Education) {
    prompt += `User educations are ${Education}. Notice all of user education are provided at one place to you so divide it using bullet points or different headings as suitable to you.`;
  }

  if (Experience) {
    prompt += `User Experience are ${Experience}. Notice all of user experience , projects are provided at one place to you so divide it using bullet points or different headings or subheadings as suitable to you.`;
  }

  if (Skills) {
    prompt += `User Skills are ${Skills}. Notice all of user skills are provided at one place to you so divide it using bullet points or Number categories skills if you can.`;
  }

  prompt += "Try you best to provide a good layout and change your layout every time and in 1 A4 size page. And remember you need to just return HTML , directly start from <!DOCTYPE html> nothing before that."
  prompt += "Just give html not even any single word other than html not even.what is this don't provide this '(```html```)' ";

  return prompt;
}