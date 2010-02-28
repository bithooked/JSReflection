/* JSReflection by Dan Martin dmartin@dmartin.org
 *
 * You may use this code under the terms of one of:
 *   The MIT License.  http://www.opensource.org/licenses/mit-license.php
 *   Gnu General Public License (GPL) Version 2.  http://www.gnu.org/licenses/gpl-2.0.html
 *   Gnu General Public License (GPL) Version 3.  http://www.gnu.org/licenses/gpl-3.0.html
 *   Any future version of the Gnu General Public License produced by the Free Software Foundation.
 */

// Anything with class name of "flipV" will be flipped vertically
if (typeof flipVClass == "undefined") {
    var flipVClass = "flipV";
}
// Anything with class name of "flipH" will be flipped horizontally
if (typeof flipHClass == "undefined") {
    var flipHClass = "flipH";
}

// Anything with class name of "reflectV" will be reflected vertically
if (typeof reflectVClass == "undefined") {
    var reflectVClass = "reflectV";
}
// Anything with class name of "flipH" will be reflected horizontally
if (typeof reflectHClass == "undefined") {
    var reflectHClass = "reflectH";
}

// The starting opacity percent for any reflection
if (typeof reflectionStartingOpacityPercent == "undefined") {
    var reflectionStartingOpacityPercent = 50;
}
// The ending opacity percent for any reflection
if (typeof reflectionEndingOpacityPercent == "undefined") {
    var reflectionEndingOpacityPercent = 10;
}
// The offset for any flip or reflection
if (typeof relectionOffset == "undefined") {
    var relectionOffset = 2;
}

/* Flips an object horizontally, and places it just to the right of the original object, with a fadeout that mimics a reflection.
 * obj: the object to flip horizontally.
 * offset: the number of pixels between the original object and the flipped object.
 * startingOpacity: the percent opacity to use at the point nearest the original object.
 * endingOpacity: the percent opacity to use at the point farthest the original object.
 */
function reflectH(obj, offset, startingOpacity, endingOpacity) {
    var left = $(obj).offset().left + obj.offsetWidth;
    var top = $(obj).offset().top;
    
	var offsetHeight = obj.offsetHeight;
	var offsetWidth = obj.offsetWidth;
	
	var fadeoutRatio = ((startingOpacity - endingOpacity)/offsetWidth);
	
	for (var i = 0; i < offsetWidth; i++) {
		var clone = obj.cloneNode(true);
		
		clone.className = null;
		clone.style.position = "absolute";
		clone.style.top = top;
		clone.style.left = left + (i * 2) - offsetWidth + offset;
		clone.style.clip = "rect(0px, " + (offsetWidth - i) + "px, " + (top + offsetHeight) +  "px, " + (offsetWidth - (i + 1)) + "px)";
		
		var fadeoutValue = startingOpacity - (i * fadeoutRatio);

		clone.style.filter = "alpha(opacity = " + fadeoutValue + ")";
		clone.style.MozOpacity = fadeoutValue/100;
		clone.style.opacity = fadeoutValue/100;
				
		document.body.appendChild(clone);
	}
}

/* Flips an object vertically, and places it just below the original object, with a fadeout that mimics a reflection.
 * obj: the object to flip vertically.
 * offset: the number of pixels between the original object and the flipped object.
 * startingOpacity: the percent opacity to use at the point nearest the original object.
 * endingOpacity: the percent opacity to use at the point farthest the original object.
 */
function reflectV(obj, offset, startingOpacity, endingOpacity) {
        var left = $(obj).offset().left;
        var top = $(obj).offset().top;
        
        var offsetHeight = obj.offsetHeight;
        var offsetWidth = obj.offsetWidth;
        var bottom = top + offsetHeight;

        var fadeoutRatio = ((startingOpacity - endingOpacity)/offsetHeight);
        
        for (var i = 0; i < offsetHeight; i++) {
                var clone = obj.cloneNode(true);
                
                clone.className = null;
                clone.style.position = "absolute";
                clone.style.top = (bottom + (offsetHeight - (i * 2)))-1 + offset;
                clone.style.left = left;
                clone.style.clip = "rect(" + i + "px, " + offsetWidth + "px, " + (i + 1) + "px, 0px)";

				var fadeoutValue = (i * fadeoutRatio) + endingOpacity;
				
                clone.style.filter = "alpha(opacity = " + fadeoutValue + ")";
                clone.style.MozOpacity = fadeoutValue/100;
                clone.style.opacity = fadeoutValue/100;

                document.body.appendChild(clone);
        }
}

var flipVElements = $('.' + flipVClass);
var flipHElements = $('.' + flipHClass); 
var reflectVElements = $('.' + reflectVClass); 
var reflectHElements = $('.' + reflectHClass); 


// Show mirror image of flipV classed elements by locating them just below themselves.
for (var i = 0; i < flipVElements.length; i++) {
	reflectV(flipVElements[i], relectionOffset, 100, 100);
}


// Show mirror image of flipH classed elements by locating them just to the right themselves.
for (var i = 0; i < flipHElements.length; i++) {
	reflectH(flipHElements[i], relectionOffset, 100, 100);
}

// Show mirror image of reflectV classed elements by locating them just below themselves.
for (var i = 0; i < reflectVElements.length; i++) {
	reflectV(reflectVElements[i], relectionOffset, reflectionStartingOpacityPercent, reflectionEndingOpacityPercent);
}

// Show reflection image of reflectH
for (var i = 0; i < reflectHElements.length; i++) {
	reflectH(reflectHElements[i], relectionOffset, reflectionStartingOpacityPercent, reflectionEndingOpacityPercent);
}
