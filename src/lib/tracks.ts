export interface MiniTrack {
  id: string;
  title: string;
  cover?: string;
  code: string;
}

export const PLAYER_TRACKS: MiniTrack[] = [
  {
    id: 'coaxial-propeller',
    title: 'Coaxial Propeller',
    cover: 'coaxial-propeller-cover.png',
    code: `//"Coaxial Propeller"
await initHydra({feedStrudel:1,detectAudio:false})
noise(20,0.6,2)
.rotate(1,-1,-2)
.mask(shape(20))
.colorama([0,1].smooth())
.modulateScale(o0)
.blend(o0,.2)
.modulateScale(o0,1,2)
//.blend(o0)
.blend(o0,.8)
.kaleid(4)
.scale(.5)
.out(o0)
setcpm(80/4)
sound("bd hh sd*2? hh").bank("dr550").room(0.7)
sound("cp").struct("~ x*4 ~.4 x*4?").juxFlip(rev).distort(0.6).lpf(70000).room(0.4).dec(.1).gain(0.1) `,
  },
  {
    id: 'bolchebaile',
    title: 'Bolchebaile',
    code: `//"Bolchebaile"
await initHydra({feedStrudel:1,detectAudio:false})
noise(2, .8)
  .luma(0.5,0.1)
  .diff(s0)
  .color(0.1,0,0)
  .layer(voronoi(2,3.3,10.9).mask(o0))
  .add(src(o0,0.1))
  .saturate(() => Math.sin(time) * .8 )
  .colorama(0.01)
  .modulateScale(osc(1,-0.1,1.3),1,0.1)
  .modulateHue(src(o0).scale(1.2),2)
  .out(o0)
setcpm(132/4)
s("supersaw")
  .lpf(700)
  .lfo({ s: "<4 <8 16>>" }, 1)
  .diode(0.7) `,
  },
];
