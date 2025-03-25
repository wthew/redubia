import style from './style.module.scss'
import clsx from 'clsx';

export default function RetroEffect() {
  return (
    <>
      {/* <div className={clsx(style["scanlines"])}></div> */}
      <div className={clsx(style["intro-wrap"])}>
        {/* <div className={clsx(style["noise noise-moving"])}></div> */}

        <div className={clsx(style["play"])} data-splitting>
          PLAY
        </div>
        <div className={clsx(style["time"])}>--:--</div>
        <div className={clsx(style["recordSpeed"])}>SCORE --</div>
      </div>
    </>
  );
}
