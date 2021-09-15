import Vue from 'vue';
import mewComponents from '@myetherwallet/mew-components';
import whiteSheet from '@/components/white-sheet/WhiteSheet.vue';
import QrCode from '@/core/components/AppQrCode.vue';
import MewSuperButton from '@/components/MewSuperButton/MewSuperButton.vue';
import MewBlockie from '@/components/MewBlockie/MewBlockie.vue';

Object.keys(mewComponents).forEach(name => {
  Vue.component(name, mewComponents[name]);
});
Vue.component('Mew6WhiteSheet', whiteSheet);
Vue.component('QrCode', QrCode);
Vue.component('MewSuperButton', MewSuperButton);
Vue.component('MewBlockie', MewBlockie);
