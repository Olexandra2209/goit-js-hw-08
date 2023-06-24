import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveTime, 1000));

function saveTime(data) {
  const time = data.seconds;
  localStorage.setItem(STORAGE_KEY, time);
}

const currentTime = localStorage.getItem(STORAGE_KEY);
if (currentTime) {
  player.setCurrentTime(currentTime);
}
