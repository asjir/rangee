(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pako')) :
	typeof define === 'function' && define.amd ? define(['exports', 'pako'], factory) :
	(factory((global.rangee = {}),global.pako));
}(this, (function (exports,pako) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var find = function (result, document) {
    var element = document.querySelector(result.s);
    if (!element) {
        throw new Error('Unable to find element with selector: ' + result.s);
    }
    return element.childNodes[result.c];
};
var generateSelector = function (node, relativeTo) {
    var currentNode = node;
    var tagNames = [];
    var textNodeIndex = 0;
    if (node.parentNode) {
        textNodeIndex = childNodeIndexOf(node.parentNode, node);
        while (currentNode) {
            var tagName = currentNode.tagName;
            if (tagName) {
                var nthIndex = computedNthIndex(currentNode);
                var selector = tagName;
                if (nthIndex > 1) {
                    selector += ":nth-of-type(" + nthIndex + ")";
                }
                tagNames.push(selector);
            }
            currentNode = (currentNode.parentNode || currentNode.parentElement);
            if (currentNode == (relativeTo.parentNode || relativeTo.parentElement)) {
                break;
            }
        }
    }
    return { s: tagNames.reverse().join(">").toLowerCase(), c: textNodeIndex, o: 0 };
};
var childNodeIndexOf = function (parentNode, childNode) {
    var childNodes = parentNode.childNodes;
    var result = 0;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        if (childNodes[i] === childNode) {
            result = i;
            break;
        }
    }
    return result;
};
var computedNthIndex = function (childElement) {
    var elementsWithSameTag = 0;
    var parent = (childElement.parentNode || childElement.parentElement);
    if (parent) {
        for (var i = 0, l = parent.childNodes.length; i < l; i++) {
            var currentHtmlElement = parent.childNodes[i];
            if (currentHtmlElement === childElement) {
                elementsWithSameTag++;
                break;
            }
            if (currentHtmlElement.tagName === childElement.tagName) {
                elementsWithSameTag++;
            }
        }
    }
    return elementsWithSameTag;
};

var serialize = function (range, relativeTo) {
    var start = generateSelector(range.startContainer, relativeTo);
    start.o = range.startOffset;
    var end = generateSelector(range.endContainer, relativeTo);
    end.o = range.endOffset;
    return { s: start, e: end };
};
var deserialize = function (result, document) {
    var range = document.createRange();
    var startNode = find(result.s, document);
    var endNode = find(result.e, document);
    if (startNode.nodeType != Node.TEXT_NODE && startNode.firstChild) {
        startNode = startNode.firstChild;
    }
    if (endNode.nodeType != Node.TEXT_NODE && endNode.firstChild) {
        endNode = endNode.firstChild;
    }
    if (startNode) {
        range.setStart(startNode, result.s.o);
    }
    if (endNode) {
        range.setEnd(endNode, result.e.o);
    }
    return range;
};

var compress = function (decompressed) { return pako.deflateRaw(decompressed, { level: 9, raw: true }); };
var decompress = function (compressed) { return pako.inflate(compressed, { raw: true, to: "string" }); };

var encode = function (buffer) { return btoa(Array.prototype.map.call(buffer, function (ch) { return String.fromCharCode(ch); }).join('')); };
var decode = function (base64) {
    var binstr = atob(base64);
    var buffer = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, index) { return buffer[index] = ch.charCodeAt(0); });
    return buffer;
};

var Rangee = /** @class */ (function () {
    function Rangee(options) {
        var _this = this;
        this.serializeAtomic = function (range) {
            var atomicRanges = _this.createAtomicRanges(range);
            var serialized = atomicRanges
                .map(function (range) { return serialize(range.cloneRange(), _this.options.document.body); })
                .map(function (serializedRange) { return JSON.stringify(serializedRange); })
                .join("|");
            var compressed = compress(serialized);
            var encoded = encode(compressed);
            return encoded;
        };
        this.deserilaizeAtomic = function (representation) {
            var decoded = decode(representation);
            var decompressed = decompress(decoded);
            var serializedRanges = decompressed
                .split("|")
                .map(function (decompressedRangeRepresentation) { return JSON.parse(decompressedRangeRepresentation); })
                .reverse()
                .map(function (serializedRange) { return deserialize(serializedRange, _this.options.document); });
            return serializedRanges;
        };
        this.serialize = function (range) {
            var serialized = serialize(range.cloneRange(), _this.options.document.body);
            var serializedStringified = JSON.stringify(serialized);
            var compressed = compress(serializedStringified);
            var encoded = encode(compressed);
            return encoded;
        };
        this.deserialize = function (serialized) {
            var decoded = decode(serialized);
            var decompressed = decompress(decoded);
            var decompressedParsed = JSON.parse(decompressed);
            var deserilaized = deserialize(decompressedParsed, _this.options.document);
            return deserilaized;
        };
        this.createAtomicRanges = function (range) {
            // text
            if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
                return [range];
            }
            var documentAsAny = _this.options.document; // IE does not know the right spec signature for createTreeWalker
            // elements
            var treeWalker = documentAsAny.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ALL, function (node) { return NodeFilter.FILTER_ACCEPT; }, false);
            var startFound = false;
            var endFound = false;
            var atomicRanges = [];
            var node;
            while (node = treeWalker.nextNode()) {
                if (node === range.startContainer) {
                    startFound = true;
                }
                if (node.nodeType === Node.TEXT_NODE && startFound && !endFound && node.textContent && node.textContent.length > 0) {
                    var atomicRange = _this.options.document.createRange();
                    atomicRange.setStart(node, node === range.startContainer ? range.startOffset : 0);
                    atomicRange.setEnd(node, node === range.endContainer ? range.endOffset : node.length);
                    atomicRanges.push(atomicRange);
                }
                if (node === range.endContainer) {
                    endFound = true;
                }
            }
            return atomicRanges;
        };
        this.options = __assign({}, options);
    }
    return Rangee;
}());

exports.Rangee = Rangee;

Object.defineProperty(exports, '__esModule', { value: true });

})));
