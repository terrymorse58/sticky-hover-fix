# sticky-hover-fix

Fixing the "sticky hover button" problem on touch devices
---
![sticky hover fix demo](https://terrymorse.com/public/sticky-hover-fix.png)
### The Problem with Buttons
* pressing a button on a touch-capable device invokes a "hover" style effect,
but the hover effect does not go away until something else is touched
* buttons on a touch-capable device don't change visually when pressed or
 released
### The Solution
**sticky-hover-fix** eliminates these problems in the following manner:
1. determines if the current device is touch-capable; if it is:
2. removes all CSS style rules containing both '.btn' and ':hover'
3. adds 'focus' and 'active' classes to button when touched
4. removes 'focus' and 'active' classes from button when touch ends
### Requirements
**sticky-hover-fix** works with all *Bootstrap* button classes, with no CSS
 changes needed. For non-Bootstrap buttons, the following must be true:

* all buttons must be assigned the class 'btn'
* at least one of the '.focus' and '.active' classes must be defined

## Demo
A live demo is available at [terrymorse.com](https://terrymorse.com).
## Installation
```shell script
  npm install sticky-hover-fix
````
## Usage
```html
<script src="sthoverfix.js"></script>
<script>
    StHoverFix.fixIfTouchDevice();
</script>
```
## License

MIT License

Copyright (c) 2020 Terry Morse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

