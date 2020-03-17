/*!
 * sthoverfix.js - fix the sticky hover problem on touch devices
 * Copyright 2020 Terry Morse
 * MIT License
 */

const StHoverFix = (function () {

  const hasMatchMedia = typeof window.matchMedia !== 'undefined';

  /**
   * determine if device is touch-capable
   * true - device is touch-capable
   * false - device is not touch-capable
   * null - unable to determine touch capability
   * @return {null|boolean}
   */
  const hasTouch = () => {
    if (hasMatchMedia) {
      return window.matchMedia('(hover: none)').matches;
    }
    return null;
  };

  let touchListenerOn = false;

  /**
   * fix up all buttons on detected touch device
   * @param {function} [callback] - called when device type is determined
   * callback has a single boolean argument, which is true if fix up occurred
   */
  function fixIfTouchDevice (callback) {

    // fix all buttons
    function fixUpAll () {
      console.log('fixUpAll()');
      removeBtnHovers();
      addPressAnimation();
      if (touchListenerOn) {
        document.removeEventListener('touchstart', touchDetected,
          { capture: true });
      }
      if (callback) {callback(true);}
      touchListenerOn = false;
    }

    // detect touch event
    function touchDetected (e) {
      fixUpAll();
    }

    if (touchListenerOn) {
      return;
    }

    // detect touch device via media query
    const isTouchDevice = hasTouch();
    console.log('fixIfTouchDevice isTouchDevice:', isTouchDevice);
    if (isTouchDevice) {
      fixUpAll();
      return;
    } else if (isTouchDevice === false) {
      // a non-touch device
      if (callback) { callback(false); }
      return;
    }

    // unable to detrmine touch-capability via media query,
    // so listen for touch event
    document.addEventListener('touchstart', touchDetected,
      { capture: true });
    touchListenerOn = true;
  }

  /**
   * remove all CSS rules contaning both '.btn' and ':hover'
   * @return {number} count of rules deleted
   */
  function removeBtnHovers () {

    let rulesDeleted = 0;

    // recursively delete '.btn:hover' rules
    function recursiveDelete (rules, styleSheet) {

      if (typeof rules === 'undefined' ||
        typeof rules.length === 'undefined' ||
        rules.length <= 0) {
        return;
      }

      // iterate in reverse order,
      // deleting any rule containing both '.btn' and ':hover'
      const ruleLen = rules.length;
      for (let i = ruleLen - 1; i >= 0; i--) {
        const rule = rules[i];
        if (typeof rule.cssRules === 'undefined') {
          // a standard rule, evaluate it
          const cssText = rule.cssText;
          if (typeof cssText === 'string' &&
            cssText.includes('.btn') &&
            cssText.includes(':hover')) {
            styleSheet.deleteRule(i);
            rulesDeleted++;
          }
        } else {
          // rule contains cssRules, iterate over them
          recursiveDelete(rule.cssRules, rule);
        }
      }
    }

    // iterate over all style sheets in document
    for (const styleSheet of document.styleSheets) {
      let rules = styleSheet.cssRules;
      if (!rules) { continue; }
      recursiveDelete(rules, styleSheet);
    }
    return rulesDeleted;
  }

  /**
   * add press animation effect to all buttons
   * @return {number}
   */
  function addPressAnimation () {
    const touchEvents = ['touchstart', 'touchend'];
    const btns = document.getElementsByTagName('button');
    let addCount = 0;

    // add 'touchstart' and 'touchend' event listeners to every button
    for (const btn of btns) {
      touchEvents.forEach(eventName => {
        btn.addEventListener(eventName, () => {
          // console.log(`button "${btn.name}" event caught: "${eventName}"`);
          if (eventName === 'touchstart') {
            btn.classList.add('focus');
            btn.classList.add('active');
          } else if (eventName === 'touchend') {
            btn.classList.remove('focus');
            btn.classList.remove('active');
          }
        });
      });
      addCount++;
    }
    return addCount;
  }

  return {
    fixIfTouchDevice,
    hasTouch,
    removeBtnHovers,
    addPressAnimation
  };
})();
