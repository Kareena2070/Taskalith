// Dark mode
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});



/* Virtual Pet Container */

let currentPetMood = 0;
const petMoods = [
   '🐱', '🐶', '🐰', '🦊', '🦁', '🐯', '🦅', '🐼', '🦄', '🐝',
   '🐍', '🦖', '🐙', '🦋', '🦢', '🦉', '🐬', '🐳', '🦦', '🦩'
 ];
  const petMessages = [
   "You slay every day!",
   "Boss mode: ON!",
   "Keep leading like a queen! ",
   "Your vibe is unstoppable! ",
   "Power moves only!",
   "Confidence looks amazing on you!",
   "Hustle hard, shine harder!",
   "You're a trailblazer!",
   "Own the room, always!",
   "Slay the day, boss lady!",
   "Your energy inspires!",
   "Keep smashing those goals!",
   "Elegance + Power = You!",
   "Nothing can stop you today!",
   "Lead with heart, conquer with style!",
   "Boss vibes in full effect!",
   "Your aura radiates success!",
   "Every day is your runway! ",
   "Glow and grow, always! ",
   "Keep ruling your empire!"
 ];


function petInteraction() {
   currentPetMood = (currentPetMood + 1) % petMoods.length;
   document.getElementById('pet-emoji').textContent = petMoods[currentPetMood];
  
   const randomMessage = petMessages[Math.floor(Math.random() * petMessages.length)];
   showPetMessage(randomMessage);
}


function showPetMessage(message) {
   const speechBubble = document.getElementById('pet-speech');
   const messageElement = document.getElementById('pet-message');
  
   messageElement.textContent = message;
   speechBubble.classList.remove('hidden');
  
   setTimeout(() => {
       speechBubble.classList.add('hidden');
   }, 3000);
}
