export default function storyPromptHandler(words: string[], topic: string) {
  return `Write a simple, short story that helps English learners. 
  The topic is ${topic} and the story should focus on using the following 
  vocabulary words in a way that makes sense and aligns with the real world. 
    Ensure that the story is educational, not too long, and engaging for students. 
    The length of the story should match the number of words: 
    if there are only one or two words, keep the story very short (2-3 lines), 
    but for 10 or more words, you can expand the story proportionally. 
    The story should feel natural and relatable, with a clear purpose to 
    teach new vocabulary and proper sentence structure. 
    Do not mention explicitly that you're writing a story based on these words 
    and just give me the pure story without access words or any explanation.Words to include: ${words}`;
}
