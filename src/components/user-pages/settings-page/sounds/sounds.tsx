import TextToSpeech from "./textToSpeech/textToSpeech";
import ReviewSounds from "./reviewSounds/reviewSounds";

export default function Sounds() {
  return (
    <div>
      <strong>Sounds</strong>
      <div>
        <TextToSpeech />
        <ReviewSounds />
      </div>
    </div>
  );
}
