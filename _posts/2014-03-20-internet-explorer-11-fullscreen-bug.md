---
layout: panelled
title: Internet Explorer 11 Fullscreen Bug
category: technology
---

# A Window Into the World

I started looking at Fullscreen support Internet Explorer 11 when trying get
[video.js][] working for a project. IE 11 added support for the [WHATCG
Fullscreen Specification][], which is great enhancement that's really useful
for putting HTML5 video into fullscreen. Support has been around in Webkit
and Mozilla for a while, but is new in IE 11.

For many users, everything works great, but there's one catch: if your video
happens to be in an iframe, and you try and make the video fullscreen, all
of your javascript-driven layout for controls or other screen overlays breaks
spectacularly.

## Fullscreen directly on the page

This first example is the happy case: a normal box being put into fullscreen
mode, and measurements taken of the gray box on the left:

<div id="fsexample" style="border: 1px solid black; padding: 10px">
    <div style="position: relative; background: white; width:  100%;">
        <table width="100%">
            <tr>
                <td width="25%">
                   <div style="padding-right: 20px">
                    <a href="#" id="box" style="display: block; position: relative; width: 100%; height: 200px; text-align: center; line-height: 200px; background: #575757;">Click Me!</a>
                   </div>
                </td>
                <td width="25%">
        <p>clientWidth: <span class="cw">&nbsp;</span></p>
        <p>clientHeight: <span class="ch">&nbsp;</span></p>
        <p>&nbsp;</p>
        <p>offsetWidth: <span class="ow">&nbsp;</span></p>
        <p>offsetHeight: <span class="oh">&nbsp;</span></p>
                </td>
                <td width="25%">
        <p>Bounding Client Rect:</p>
        <ul>
            <li>Top: <span class="top">&nbsp;</span></li>
            <li>Right: <span class="right">&nbsp;</span></li>
            <li>Bottom: <span class="bottom">&nbsp;</span></li>
            <li>Left: <span class="left">&nbsp;</span></li>
        </ul>
                </td>
                <td width="25%">
        <p>jquery 2.1.0:</p>
        <ul>
            <li>innerWidth: <span class="jqiw">&nbsp;</span></li>
            <li>outerWidth: <span class="jqow">&nbsp;</span></li>
            <li>innerHeight: <span class="jqih">&nbsp;</span></li>
            <li>outerHeight: <span class="jqoh">&nbsp;</span></li>
        </ul>
                </td>
            </tr>
        </table>
    </div>
</div>

## Fullscreen through an iframe

The second example has the same HTML content hosted within an iframe:


<iframe allowfullscreen="allowfullscreen" style="width: 100%; height: 224px; border: none; overflow: hidden" src="/ie11fullscreen/content.html">
</iframe>


## Deconstructing the issue

This problem had us scratching our heads for a while, while we worked
out how to deal with it. Testing for it was simple enough, just check for
whether offsetWidth/Height is less than clientWidth/Height. Since the former
should always be less than or equal to the latter it's easy to tell when the
value is wrong, but not what the true value should be.

After staring at the numbers for a while, it dawned on us that the values
were off by exactly two orders of magnitude! This was particularly obvious
for the `getBoundingClientRect` values, which are decimals. Comparing these
numbers to their equivalents in Chrome and Firefox confirmed the hypothesis.

As of this writing, the problem is visible in IE version 11.0.9600.16428.


<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script type="text/javascript" src="/ie11fullscreen/screenfull.min.js"></script>
<script type="text/javascript" src="/ie11fullscreen/fullscreen-test.js"></script>

[video.js]: http://www.videojs.com/
[WHATCG Fullscreen Specification]: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html

