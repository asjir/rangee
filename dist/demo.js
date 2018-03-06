/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pako/index.js":
/*!************************************!*\
  !*** ./node_modules/pako/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = __webpack_require__(/*! ./lib/utils/common */ "./node_modules/pako/lib/utils/common.js").assign;

var deflate   = __webpack_require__(/*! ./lib/deflate */ "./node_modules/pako/lib/deflate.js");
var inflate   = __webpack_require__(/*! ./lib/inflate */ "./node_modules/pako/lib/inflate.js");
var constants = __webpack_require__(/*! ./lib/zlib/constants */ "./node_modules/pako/lib/zlib/constants.js");

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),

/***/ "./node_modules/pako/lib/deflate.js":
/*!******************************************!*\
  !*** ./node_modules/pako/lib/deflate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_deflate = __webpack_require__(/*! ./zlib/deflate */ "./node_modules/pako/lib/zlib/deflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "./node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "./node_modules/pako/lib/utils/strings.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "./node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "./node_modules/pako/lib/zlib/zstream.js");

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),

/***/ "./node_modules/pako/lib/inflate.js":
/*!******************************************!*\
  !*** ./node_modules/pako/lib/inflate.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_inflate = __webpack_require__(/*! ./zlib/inflate */ "./node_modules/pako/lib/zlib/inflate.js");
var utils        = __webpack_require__(/*! ./utils/common */ "./node_modules/pako/lib/utils/common.js");
var strings      = __webpack_require__(/*! ./utils/strings */ "./node_modules/pako/lib/utils/strings.js");
var c            = __webpack_require__(/*! ./zlib/constants */ "./node_modules/pako/lib/zlib/constants.js");
var msg          = __webpack_require__(/*! ./zlib/messages */ "./node_modules/pako/lib/zlib/messages.js");
var ZStream      = __webpack_require__(/*! ./zlib/zstream */ "./node_modules/pako/lib/zlib/zstream.js");
var GZheader     = __webpack_require__(/*! ./zlib/gzheader */ "./node_modules/pako/lib/zlib/gzheader.js");

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),

/***/ "./node_modules/pako/lib/utils/common.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/utils/common.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),

/***/ "./node_modules/pako/lib/utils/strings.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/utils/strings.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers



var utils = __webpack_require__(/*! ./common */ "./node_modules/pako/lib/utils/common.js");


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/adler32.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/adler32.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/pako/lib/zlib/constants.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/crc32.js":
/*!*********************************************!*\
  !*** ./node_modules/pako/lib/zlib/crc32.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/deflate.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/deflate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");
var trees   = __webpack_require__(/*! ./trees */ "./node_modules/pako/lib/zlib/trees.js");
var adler32 = __webpack_require__(/*! ./adler32 */ "./node_modules/pako/lib/zlib/adler32.js");
var crc32   = __webpack_require__(/*! ./crc32 */ "./node_modules/pako/lib/zlib/crc32.js");
var msg     = __webpack_require__(/*! ./messages */ "./node_modules/pako/lib/zlib/messages.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),

/***/ "./node_modules/pako/lib/zlib/gzheader.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/gzheader.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inffast.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/inffast.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inflate.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/inflate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");
var adler32       = __webpack_require__(/*! ./adler32 */ "./node_modules/pako/lib/zlib/adler32.js");
var crc32         = __webpack_require__(/*! ./crc32 */ "./node_modules/pako/lib/zlib/crc32.js");
var inflate_fast  = __webpack_require__(/*! ./inffast */ "./node_modules/pako/lib/zlib/inffast.js");
var inflate_table = __webpack_require__(/*! ./inftrees */ "./node_modules/pako/lib/zlib/inftrees.js");

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),

/***/ "./node_modules/pako/lib/zlib/inftrees.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/inftrees.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/messages.js":
/*!************************************************!*\
  !*** ./node_modules/pako/lib/zlib/messages.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),

/***/ "./node_modules/pako/lib/zlib/trees.js":
/*!*********************************************!*\
  !*** ./node_modules/pako/lib/zlib/trees.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(/*! ../utils/common */ "./node_modules/pako/lib/utils/common.js");

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),

/***/ "./node_modules/pako/lib/zlib/zstream.js":
/*!***********************************************!*\
  !*** ./node_modules/pako/lib/zlib/zstream.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),

/***/ "./src/HtmlElementSelectorGenerator.ts":
/*!*********************************************!*\
  !*** ./src/HtmlElementSelectorGenerator.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = function (result, document) {
    var element = document.querySelector(result.s);
    if (!element) {
        throw new Error('Unable to find element with selector: ' + result.s);
    }
    return element.childNodes[result.c];
};
exports.generateSelector = function (node, relativeTo) {
    var currentNode = node;
    var tagNames = [];
    var textNodeIndex = 0;
    if (node.parentNode) {
        textNodeIndex = _this.childNodeIndexOf(node.parentNode, node);
        while (currentNode) {
            var tagName = currentNode.tagName;
            if (tagName) {
                var nthIndex = _this.computedNthIndex(currentNode);
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
exports.childNodeIndexOf = function (parentNode, childNode) {
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
exports.computedNthIndex = function (childElement) {
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


/***/ }),

/***/ "./src/RangeCompressor.ts":
/*!********************************!*\
  !*** ./src/RangeCompressor.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pako = __webpack_require__(/*! pako */ "./node_modules/pako/index.js");
exports.compress = function (decompressed) { return Pako.deflateRaw(decompressed, { level: 9, raw: true }); };
exports.decompress = function (compressed) { return Pako.inflate(compressed, { raw: true, to: "string" }); };


/***/ }),

/***/ "./src/RangeEncoder.ts":
/*!*****************************!*\
  !*** ./src/RangeEncoder.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = function (buffer) { return btoa(Array.prototype.map.call(buffer, function (ch) { return String.fromCharCode(ch); }).join('')); };
exports.decode = function (base64) {
    var binstr = atob(base64);
    var buffer = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, index) { return buffer[index] = ch.charCodeAt(0); });
    return buffer;
};


/***/ }),

/***/ "./src/RangeSerializer.ts":
/*!********************************!*\
  !*** ./src/RangeSerializer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HtmlElementSelectorGenerator_1 = __webpack_require__(/*! ./HtmlElementSelectorGenerator */ "./src/HtmlElementSelectorGenerator.ts");
exports.serialize = function (range, relativeTo) {
    var start = HtmlElementSelectorGenerator_1.generateSelector(range.startContainer, relativeTo);
    start.o = range.startOffset;
    var end = HtmlElementSelectorGenerator_1.generateSelector(range.endContainer, relativeTo);
    end.o = range.endOffset;
    return { s: start, e: end };
};
exports.deserialize = function (result, document) {
    var range = document.createRange();
    var startNode = HtmlElementSelectorGenerator_1.find(result.s, document);
    var endNode = HtmlElementSelectorGenerator_1.find(result.e, document);
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


/***/ }),

/***/ "./src/Rangee.ts":
/*!***********************!*\
  !*** ./src/Rangee.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RangeSerializer_1 = __webpack_require__(/*! ./RangeSerializer */ "./src/RangeSerializer.ts");
var RangeCompressor_1 = __webpack_require__(/*! ./RangeCompressor */ "./src/RangeCompressor.ts");
var RangeEncoder_1 = __webpack_require__(/*! ./RangeEncoder */ "./src/RangeEncoder.ts");
var Rangee = /** @class */ (function () {
    function Rangee(options) {
        var _this = this;
        this.getEncodedRange = function (range) {
            var partialRanges = _this.createPartialRanges(range);
            var serialized = partialRanges
                .map(function (range) { return RangeSerializer_1.serialize(range.cloneRange(), _this.options.document.body); })
                .map(function (serializedRange) { return JSON.stringify(serializedRange); })
                .join("|");
            var compressed = RangeCompressor_1.compress(serialized);
            var encoded = RangeEncoder_1.encode(compressed);
            return encoded;
        };
        this.getDecodedRanges = function (representation) {
            var decoded = RangeEncoder_1.decode(representation);
            var decompressed = RangeCompressor_1.decompress(decoded);
            var serializedRanges = decompressed
                .split("|")
                .map(function (decompressedRangeRepresentation) { return JSON.parse(decompressedRangeRepresentation); })
                .reverse()
                .map(function (serializedRange) { return RangeSerializer_1.deserialize(serializedRange, _this.options.document); });
            return serializedRanges;
        };
        this.createPartialRanges = function (range) {
            // text
            if (range.startContainer === range.endContainer
                && range.startContainer.nodeType === Node.TEXT_NODE
                && range.endContainer.nodeType === Node.TEXT_NODE) {
                return [range];
            }
            var documentAsAny = _this.options.document; // IE does not know the right spec signature for createTreeWalker
            // elements
            var treeWalker = documentAsAny.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ALL, function (node) { return NodeFilter.FILTER_ACCEPT; }, false);
            var startFound = false;
            var endFound = false;
            var ranges = [];
            var node;
            while (node = treeWalker.nextNode()) {
                if (node === range.startContainer) {
                    startFound = true;
                }
                if (node.nodeType === Node.TEXT_NODE && startFound && !endFound && node.textContent && node.textContent.length > 0) {
                    var newRange = _this.options.document.createRange();
                    newRange.setStart(node, node === range.startContainer ? range.startOffset : 0);
                    newRange.setEnd(node, node === range.endContainer ? range.endOffset : node.length);
                    ranges.push(newRange);
                }
                if (node === range.endContainer) {
                    endFound = true;
                }
            }
            return ranges;
        };
        this.options = __assign({}, options);
    }
    return Rangee;
}());
exports.Rangee = Rangee;


/***/ }),

/***/ "./src/demo.ts":
/*!*********************!*\
  !*** ./src/demo.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rangee_1 = __webpack_require__(/*! ./Rangee */ "./src/Rangee.ts");
var rangee = new Rangee_1.Rangee({ document: document });
var clonedExample = document.querySelector("#demo").cloneNode(true);
var rangeRepresentationStorage = [];
document.querySelector("#save").addEventListener("click", function () {
    var selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        if (range) {
            var rangeRepresentation = rangee.getEncodedRange(range);
            console.log(rangeRepresentation);
            rangeRepresentationStorage.push(rangeRepresentation);
            selection.removeAllRanges();
        }
    }
});
document.querySelector("#load").addEventListener("click", function () {
    document.querySelector("#demo").innerHTML = clonedExample.innerHTML;
    rangeRepresentationStorage.forEach(function (rangeRepresentation) {
        var ranges = rangee.getDecodedRanges(rangeRepresentation);
        ranges.forEach(function (range) {
            var highlight = document.createElement("mark");
            range.surroundContents(highlight);
        });
    });
});
document.querySelector("#reset").addEventListener("click", function () {
    document.querySelector("#demo").innerHTML = clonedExample.innerHTML;
});
document.querySelector("#clear").addEventListener("click", function () {
    rangeRepresentationStorage = [];
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bha28vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL2RlZmxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL2luZmxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3V0aWxzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9hZGxlcjMyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9jcmMzMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9kZWZsYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2d6aGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2luZmZhc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3psaWIvaW5mbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9pbmZ0cmVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9tZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi90cmVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi96c3RyZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9IdG1sRWxlbWVudFNlbGVjdG9yR2VuZXJhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9SYW5nZUNvbXByZXNzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JhbmdlRW5jb2Rlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmFuZ2VTZXJpYWxpemVyLnRzIiwid2VicGFjazovLy8uL3NyYy9SYW5nZWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNiQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxVQUFVO0FBQzdDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxxQkFBcUIsOEJBQThCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxlQUFlOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixjQUFjOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUIseUNBQXlDOztBQUU5RDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL1lBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EscUJBQXFCLDhCQUE4QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGVBQWU7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNCQUFzQjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixtQkFBbUI7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixjQUFjO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrRUFBa0U7O0FBRXZGOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUIs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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixhQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtB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Q0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RWQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCOztBQUVBOzs7QUFHQSxvQkFBb0Isc0JBQXNCLHFCQUFxQixjQUFjLEVBQUU7O0FBRS9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztB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QTtBQUNBLHVDQUF1QyxxRkFBcUYsRUFBRTtBQUM5SCxpREFBaUQsd0NBQXdDLEVBQUU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsb0RBQW9ELEVBQUU7QUFDdkg7QUFDQSxpREFBaUQsK0VBQStFLEVBQUU7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0EsaUlBQWlJLGlDQUFpQyxFQUFFO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7OztBQ3RFQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0Esa0NBQWtDLHFCQUFxQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZW1vLnRzXCIpO1xuIiwiLy8gVG9wIGxldmVsIGZpbGUgaXMganVzdCBhIG1peGluIG9mIHN1Ym1vZHVsZXMgJiBjb25zdGFudHNcbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICA9IHJlcXVpcmUoJy4vbGliL3V0aWxzL2NvbW1vbicpLmFzc2lnbjtcblxudmFyIGRlZmxhdGUgICA9IHJlcXVpcmUoJy4vbGliL2RlZmxhdGUnKTtcbnZhciBpbmZsYXRlICAgPSByZXF1aXJlKCcuL2xpYi9pbmZsYXRlJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9saWIvemxpYi9jb25zdGFudHMnKTtcblxudmFyIHBha28gPSB7fTtcblxuYXNzaWduKHBha28sIGRlZmxhdGUsIGluZmxhdGUsIGNvbnN0YW50cyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcGFrbztcbiIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgemxpYl9kZWZsYXRlID0gcmVxdWlyZSgnLi96bGliL2RlZmxhdGUnKTtcbnZhciB1dGlscyAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2NvbW1vbicpO1xudmFyIHN0cmluZ3MgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvc3RyaW5ncycpO1xudmFyIG1zZyAgICAgICAgICA9IHJlcXVpcmUoJy4vemxpYi9tZXNzYWdlcycpO1xudmFyIFpTdHJlYW0gICAgICA9IHJlcXVpcmUoJy4vemxpYi96c3RyZWFtJyk7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG52YXIgWl9OT19GTFVTSCAgICAgID0gMDtcbnZhciBaX0ZJTklTSCAgICAgICAgPSA0O1xuXG52YXIgWl9PSyAgICAgICAgICAgID0gMDtcbnZhciBaX1NUUkVBTV9FTkQgICAgPSAxO1xudmFyIFpfU1lOQ19GTFVTSCAgICA9IDI7XG5cbnZhciBaX0RFRkFVTFRfQ09NUFJFU1NJT04gPSAtMTtcblxudmFyIFpfREVGQVVMVF9TVFJBVEVHWSAgICA9IDA7XG5cbnZhciBaX0RFRkxBVEVEICA9IDg7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuLyoqXG4gKiBjbGFzcyBEZWZsYXRlXG4gKlxuICogR2VuZXJpYyBKUy1zdHlsZSB3cmFwcGVyIGZvciB6bGliIGNhbGxzLiBJZiB5b3UgZG9uJ3QgbmVlZFxuICogc3RyZWFtaW5nIGJlaGF2aW91ciAtIHVzZSBtb3JlIHNpbXBsZSBmdW5jdGlvbnM6IFtbZGVmbGF0ZV1dLFxuICogW1tkZWZsYXRlUmF3XV0gYW5kIFtbZ3ppcF1dLlxuICoqL1xuXG4vKiBpbnRlcm5hbFxuICogRGVmbGF0ZS5jaHVua3MgLT4gQXJyYXlcbiAqXG4gKiBDaHVua3Mgb2Ygb3V0cHV0IGRhdGEsIGlmIFtbRGVmbGF0ZSNvbkRhdGFdXSBub3Qgb3ZlcnJpZGRlbi5cbiAqKi9cblxuLyoqXG4gKiBEZWZsYXRlLnJlc3VsdCAtPiBVaW50OEFycmF5fEFycmF5XG4gKlxuICogQ29tcHJlc3NlZCByZXN1bHQsIGdlbmVyYXRlZCBieSBkZWZhdWx0IFtbRGVmbGF0ZSNvbkRhdGFdXVxuICogYW5kIFtbRGVmbGF0ZSNvbkVuZF1dIGhhbmRsZXJzLiBGaWxsZWQgYWZ0ZXIgeW91IHB1c2ggbGFzdCBjaHVua1xuICogKGNhbGwgW1tEZWZsYXRlI3B1c2hdXSB3aXRoIGBaX0ZJTklTSGAgLyBgdHJ1ZWAgcGFyYW0pICBvciBpZiB5b3VcbiAqIHB1c2ggYSBjaHVuayB3aXRoIGV4cGxpY2l0IGZsdXNoIChjYWxsIFtbRGVmbGF0ZSNwdXNoXV0gd2l0aFxuICogYFpfU1lOQ19GTFVTSGAgcGFyYW0pLlxuICoqL1xuXG4vKipcbiAqIERlZmxhdGUuZXJyIC0+IE51bWJlclxuICpcbiAqIEVycm9yIGNvZGUgYWZ0ZXIgZGVmbGF0ZSBmaW5pc2hlZC4gMCAoWl9PSykgb24gc3VjY2Vzcy5cbiAqIFlvdSB3aWxsIG5vdCBuZWVkIGl0IGluIHJlYWwgbGlmZSwgYmVjYXVzZSBkZWZsYXRlIGVycm9yc1xuICogYXJlIHBvc3NpYmxlIG9ubHkgb24gd3Jvbmcgb3B0aW9ucyBvciBiYWQgYG9uRGF0YWAgLyBgb25FbmRgXG4gKiBjdXN0b20gaGFuZGxlcnMuXG4gKiovXG5cbi8qKlxuICogRGVmbGF0ZS5tc2cgLT4gU3RyaW5nXG4gKlxuICogRXJyb3IgbWVzc2FnZSwgaWYgW1tEZWZsYXRlLmVycl1dICE9IDBcbiAqKi9cblxuXG4vKipcbiAqIG5ldyBEZWZsYXRlKG9wdGlvbnMpXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHpsaWIgZGVmbGF0ZSBvcHRpb25zLlxuICpcbiAqIENyZWF0ZXMgbmV3IGRlZmxhdG9yIGluc3RhbmNlIHdpdGggc3BlY2lmaWVkIHBhcmFtcy4gVGhyb3dzIGV4Y2VwdGlvblxuICogb24gYmFkIHBhcmFtcy4gU3VwcG9ydGVkIG9wdGlvbnM6XG4gKlxuICogLSBgbGV2ZWxgXG4gKiAtIGB3aW5kb3dCaXRzYFxuICogLSBgbWVtTGV2ZWxgXG4gKiAtIGBzdHJhdGVneWBcbiAqIC0gYGRpY3Rpb25hcnlgXG4gKlxuICogW2h0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZF0oaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlc2UuXG4gKlxuICogQWRkaXRpb25hbCBvcHRpb25zLCBmb3IgaW50ZXJuYWwgbmVlZHM6XG4gKlxuICogLSBgY2h1bmtTaXplYCAtIHNpemUgb2YgZ2VuZXJhdGVkIGRhdGEgY2h1bmtzICgxNksgYnkgZGVmYXVsdClcbiAqIC0gYHJhd2AgKEJvb2xlYW4pIC0gZG8gcmF3IGRlZmxhdGVcbiAqIC0gYGd6aXBgIChCb29sZWFuKSAtIGNyZWF0ZSBnemlwIHdyYXBwZXJcbiAqIC0gYHRvYCAoU3RyaW5nKSAtIGlmIGVxdWFsIHRvICdzdHJpbmcnLCB0aGVuIHJlc3VsdCB3aWxsIGJlIFwiYmluYXJ5IHN0cmluZ1wiXG4gKiAgICAoZWFjaCBjaGFyIGNvZGUgWzAuLjI1NV0pXG4gKiAtIGBoZWFkZXJgIChPYmplY3QpIC0gY3VzdG9tIGhlYWRlciBmb3IgZ3ppcFxuICogICAtIGB0ZXh0YCAoQm9vbGVhbikgLSB0cnVlIGlmIGNvbXByZXNzZWQgZGF0YSBiZWxpZXZlZCB0byBiZSB0ZXh0XG4gKiAgIC0gYHRpbWVgIChOdW1iZXIpIC0gbW9kaWZpY2F0aW9uIHRpbWUsIHVuaXggdGltZXN0YW1wXG4gKiAgIC0gYG9zYCAoTnVtYmVyKSAtIG9wZXJhdGlvbiBzeXN0ZW0gY29kZVxuICogICAtIGBleHRyYWAgKEFycmF5KSAtIGFycmF5IG9mIGJ5dGVzIHdpdGggZXh0cmEgZGF0YSAobWF4IDY1NTM2KVxuICogICAtIGBuYW1lYCAoU3RyaW5nKSAtIGZpbGUgbmFtZSAoYmluYXJ5IHN0cmluZylcbiAqICAgLSBgY29tbWVudGAgKFN0cmluZykgLSBjb21tZW50IChiaW5hcnkgc3RyaW5nKVxuICogICAtIGBoY3JjYCAoQm9vbGVhbikgLSB0cnVlIGlmIGhlYWRlciBjcmMgc2hvdWxkIGJlIGFkZGVkXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGNodW5rMSA9IFVpbnQ4QXJyYXkoWzEsMiwzLDQsNSw2LDcsOCw5XSlcbiAqICAgLCBjaHVuazIgPSBVaW50OEFycmF5KFsxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOV0pO1xuICpcbiAqIHZhciBkZWZsYXRlID0gbmV3IHBha28uRGVmbGF0ZSh7IGxldmVsOiAzfSk7XG4gKlxuICogZGVmbGF0ZS5wdXNoKGNodW5rMSwgZmFsc2UpO1xuICogZGVmbGF0ZS5wdXNoKGNodW5rMiwgdHJ1ZSk7ICAvLyB0cnVlIC0+IGxhc3QgY2h1bmtcbiAqXG4gKiBpZiAoZGVmbGF0ZS5lcnIpIHsgdGhyb3cgbmV3IEVycm9yKGRlZmxhdGUuZXJyKTsgfVxuICpcbiAqIGNvbnNvbGUubG9nKGRlZmxhdGUucmVzdWx0KTtcbiAqIGBgYFxuICoqL1xuZnVuY3Rpb24gRGVmbGF0ZShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEZWZsYXRlKSkgcmV0dXJuIG5ldyBEZWZsYXRlKG9wdGlvbnMpO1xuXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmFzc2lnbih7XG4gICAgbGV2ZWw6IFpfREVGQVVMVF9DT01QUkVTU0lPTixcbiAgICBtZXRob2Q6IFpfREVGTEFURUQsXG4gICAgY2h1bmtTaXplOiAxNjM4NCxcbiAgICB3aW5kb3dCaXRzOiAxNSxcbiAgICBtZW1MZXZlbDogOCxcbiAgICBzdHJhdGVneTogWl9ERUZBVUxUX1NUUkFURUdZLFxuICAgIHRvOiAnJ1xuICB9LCBvcHRpb25zIHx8IHt9KTtcblxuICB2YXIgb3B0ID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmIChvcHQucmF3ICYmIChvcHQud2luZG93Qml0cyA+IDApKSB7XG4gICAgb3B0LndpbmRvd0JpdHMgPSAtb3B0LndpbmRvd0JpdHM7XG4gIH1cblxuICBlbHNlIGlmIChvcHQuZ3ppcCAmJiAob3B0LndpbmRvd0JpdHMgPiAwKSAmJiAob3B0LndpbmRvd0JpdHMgPCAxNikpIHtcbiAgICBvcHQud2luZG93Qml0cyArPSAxNjtcbiAgfVxuXG4gIHRoaXMuZXJyICAgID0gMDsgICAgICAvLyBlcnJvciBjb2RlLCBpZiBoYXBwZW5zICgwID0gWl9PSylcbiAgdGhpcy5tc2cgICAgPSAnJzsgICAgIC8vIGVycm9yIG1lc3NhZ2VcbiAgdGhpcy5lbmRlZCAgPSBmYWxzZTsgIC8vIHVzZWQgdG8gYXZvaWQgbXVsdGlwbGUgb25FbmQoKSBjYWxsc1xuICB0aGlzLmNodW5rcyA9IFtdOyAgICAgLy8gY2h1bmtzIG9mIGNvbXByZXNzZWQgZGF0YVxuXG4gIHRoaXMuc3RybSA9IG5ldyBaU3RyZWFtKCk7XG4gIHRoaXMuc3RybS5hdmFpbF9vdXQgPSAwO1xuXG4gIHZhciBzdGF0dXMgPSB6bGliX2RlZmxhdGUuZGVmbGF0ZUluaXQyKFxuICAgIHRoaXMuc3RybSxcbiAgICBvcHQubGV2ZWwsXG4gICAgb3B0Lm1ldGhvZCxcbiAgICBvcHQud2luZG93Qml0cyxcbiAgICBvcHQubWVtTGV2ZWwsXG4gICAgb3B0LnN0cmF0ZWd5XG4gICk7XG5cbiAgaWYgKHN0YXR1cyAhPT0gWl9PSykge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2dbc3RhdHVzXSk7XG4gIH1cblxuICBpZiAob3B0LmhlYWRlcikge1xuICAgIHpsaWJfZGVmbGF0ZS5kZWZsYXRlU2V0SGVhZGVyKHRoaXMuc3RybSwgb3B0LmhlYWRlcik7XG4gIH1cblxuICBpZiAob3B0LmRpY3Rpb25hcnkpIHtcbiAgICB2YXIgZGljdDtcbiAgICAvLyBDb252ZXJ0IGRhdGEgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBvcHQuZGljdGlvbmFyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIElmIHdlIG5lZWQgdG8gY29tcHJlc3MgdGV4dCwgY2hhbmdlIGVuY29kaW5nIHRvIHV0ZjguXG4gICAgICBkaWN0ID0gc3RyaW5ncy5zdHJpbmcyYnVmKG9wdC5kaWN0aW9uYXJ5KTtcbiAgICB9IGVsc2UgaWYgKHRvU3RyaW5nLmNhbGwob3B0LmRpY3Rpb25hcnkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG4gICAgICBkaWN0ID0gbmV3IFVpbnQ4QXJyYXkob3B0LmRpY3Rpb25hcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaWN0ID0gb3B0LmRpY3Rpb25hcnk7XG4gICAgfVxuXG4gICAgc3RhdHVzID0gemxpYl9kZWZsYXRlLmRlZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSwgZGljdCk7XG5cbiAgICBpZiAoc3RhdHVzICE9PSBaX09LKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnW3N0YXR1c10pO1xuICAgIH1cblxuICAgIHRoaXMuX2RpY3Rfc2V0ID0gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIERlZmxhdGUjcHVzaChkYXRhWywgbW9kZV0pIC0+IEJvb2xlYW5cbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxBcnJheUJ1ZmZlcnxTdHJpbmcpOiBpbnB1dCBkYXRhLiBTdHJpbmdzIHdpbGwgYmVcbiAqICAgY29udmVydGVkIHRvIHV0ZjggYnl0ZSBzZXF1ZW5jZS5cbiAqIC0gbW9kZSAoTnVtYmVyfEJvb2xlYW4pOiAwLi42IGZvciBjb3JyZXNwb25kaW5nIFpfTk9fRkxVU0guLlpfVFJFRSBtb2Rlcy5cbiAqICAgU2VlIGNvbnN0YW50cy4gU2tpcHBlZCBvciBgZmFsc2VgIG1lYW5zIFpfTk9fRkxVU0gsIGB0cnVlYCBtZWFucyBaX0ZJTklTSC5cbiAqXG4gKiBTZW5kcyBpbnB1dCBkYXRhIHRvIGRlZmxhdGUgcGlwZSwgZ2VuZXJhdGluZyBbW0RlZmxhdGUjb25EYXRhXV0gY2FsbHMgd2l0aFxuICogbmV3IGNvbXByZXNzZWQgY2h1bmtzLiBSZXR1cm5zIGB0cnVlYCBvbiBzdWNjZXNzLiBUaGUgbGFzdCBkYXRhIGJsb2NrIG11c3QgaGF2ZVxuICogbW9kZSBaX0ZJTklTSCAob3IgYHRydWVgKS4gVGhhdCB3aWxsIGZsdXNoIGludGVybmFsIHBlbmRpbmcgYnVmZmVycyBhbmQgY2FsbFxuICogW1tEZWZsYXRlI29uRW5kXV0uIEZvciBpbnRlcmltIGV4cGxpY2l0IGZsdXNoZXMgKHdpdGhvdXQgZW5kaW5nIHRoZSBzdHJlYW0pIHlvdVxuICogY2FuIHVzZSBtb2RlIFpfU1lOQ19GTFVTSCwga2VlcGluZyB0aGUgY29tcHJlc3Npb24gY29udGV4dC5cbiAqXG4gKiBPbiBmYWlsIGNhbGwgW1tEZWZsYXRlI29uRW5kXV0gd2l0aCBlcnJvciBjb2RlIGFuZCByZXR1cm4gZmFsc2UuXG4gKlxuICogV2Ugc3Ryb25nbHkgcmVjb21tZW5kIHRvIHVzZSBgVWludDhBcnJheWAgb24gaW5wdXQgZm9yIGJlc3Qgc3BlZWQgKG91dHB1dFxuICogYXJyYXkgZm9ybWF0IGlzIGRldGVjdGVkIGF1dG9tYXRpY2FsbHkpLiBBbHNvLCBkb24ndCBza2lwIGxhc3QgcGFyYW0gYW5kIGFsd2F5c1xuICogdXNlIHRoZSBzYW1lIHR5cGUgaW4geW91ciBjb2RlIChib29sZWFuIG9yIG51bWJlcikuIFRoYXQgd2lsbCBpbXByb3ZlIEpTIHNwZWVkLlxuICpcbiAqIEZvciByZWd1bGFyIGBBcnJheWAtcyBtYWtlIHN1cmUgYWxsIGVsZW1lbnRzIGFyZSBbMC4uMjU1XS5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogcHVzaChjaHVuaywgZmFsc2UpOyAvLyBwdXNoIG9uZSBvZiBkYXRhIGNodW5rc1xuICogLi4uXG4gKiBwdXNoKGNodW5rLCB0cnVlKTsgIC8vIHB1c2ggbGFzdCBjaHVua1xuICogYGBgXG4gKiovXG5EZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIG1vZGUpIHtcbiAgdmFyIHN0cm0gPSB0aGlzLnN0cm07XG4gIHZhciBjaHVua1NpemUgPSB0aGlzLm9wdGlvbnMuY2h1bmtTaXplO1xuICB2YXIgc3RhdHVzLCBfbW9kZTtcblxuICBpZiAodGhpcy5lbmRlZCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICBfbW9kZSA9IChtb2RlID09PSB+fm1vZGUpID8gbW9kZSA6ICgobW9kZSA9PT0gdHJ1ZSkgPyBaX0ZJTklTSCA6IFpfTk9fRkxVU0gpO1xuXG4gIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIC8vIElmIHdlIG5lZWQgdG8gY29tcHJlc3MgdGV4dCwgY2hhbmdlIGVuY29kaW5nIHRvIHV0ZjguXG4gICAgc3RybS5pbnB1dCA9IHN0cmluZ3Muc3RyaW5nMmJ1ZihkYXRhKTtcbiAgfSBlbHNlIGlmICh0b1N0cmluZy5jYWxsKGRhdGEpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG4gICAgc3RybS5pbnB1dCA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB9IGVsc2Uge1xuICAgIHN0cm0uaW5wdXQgPSBkYXRhO1xuICB9XG5cbiAgc3RybS5uZXh0X2luID0gMDtcbiAgc3RybS5hdmFpbF9pbiA9IHN0cm0uaW5wdXQubGVuZ3RoO1xuXG4gIGRvIHtcbiAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHN0cm0ub3V0cHV0ID0gbmV3IHV0aWxzLkJ1ZjgoY2h1bmtTaXplKTtcbiAgICAgIHN0cm0ubmV4dF9vdXQgPSAwO1xuICAgICAgc3RybS5hdmFpbF9vdXQgPSBjaHVua1NpemU7XG4gICAgfVxuICAgIHN0YXR1cyA9IHpsaWJfZGVmbGF0ZS5kZWZsYXRlKHN0cm0sIF9tb2RlKTsgICAgLyogbm8gYmFkIHJldHVybiB2YWx1ZSAqL1xuXG4gICAgaWYgKHN0YXR1cyAhPT0gWl9TVFJFQU1fRU5EICYmIHN0YXR1cyAhPT0gWl9PSykge1xuICAgICAgdGhpcy5vbkVuZChzdGF0dXMpO1xuICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCB8fCAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiAoX21vZGUgPT09IFpfRklOSVNIIHx8IF9tb2RlID09PSBaX1NZTkNfRkxVU0gpKSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy50byA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5vbkRhdGEoc3RyaW5ncy5idWYyYmluc3RyaW5nKHV0aWxzLnNocmlua0J1ZihzdHJtLm91dHB1dCwgc3RybS5uZXh0X291dCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25EYXRhKHV0aWxzLnNocmlua0J1ZihzdHJtLm91dHB1dCwgc3RybS5uZXh0X291dCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSB3aGlsZSAoKHN0cm0uYXZhaWxfaW4gPiAwIHx8IHN0cm0uYXZhaWxfb3V0ID09PSAwKSAmJiBzdGF0dXMgIT09IFpfU1RSRUFNX0VORCk7XG5cbiAgLy8gRmluYWxpemUgb24gdGhlIGxhc3QgY2h1bmsuXG4gIGlmIChfbW9kZSA9PT0gWl9GSU5JU0gpIHtcbiAgICBzdGF0dXMgPSB6bGliX2RlZmxhdGUuZGVmbGF0ZUVuZCh0aGlzLnN0cm0pO1xuICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gc3RhdHVzID09PSBaX09LO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaW50ZXJpbSByZXN1bHRzIGlmIFpfU1lOQ19GTFVTSC5cbiAgaWYgKF9tb2RlID09PSBaX1NZTkNfRkxVU0gpIHtcbiAgICB0aGlzLm9uRW5kKFpfT0spO1xuICAgIHN0cm0uYXZhaWxfb3V0ID0gMDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIERlZmxhdGUjb25EYXRhKGNodW5rKSAtPiBWb2lkXG4gKiAtIGNodW5rIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IG91dHB1dCBkYXRhLiBUeXBlIG9mIGFycmF5IGRlcGVuZHNcbiAqICAgb24ganMgZW5naW5lIHN1cHBvcnQuIFdoZW4gc3RyaW5nIG91dHB1dCByZXF1ZXN0ZWQsIGVhY2ggY2h1bmtcbiAqICAgd2lsbCBiZSBzdHJpbmcuXG4gKlxuICogQnkgZGVmYXVsdCwgc3RvcmVzIGRhdGEgYmxvY2tzIGluIGBjaHVua3NbXWAgcHJvcGVydHkgYW5kIGdsdWVcbiAqIHRob3NlIGluIGBvbkVuZGAuIE92ZXJyaWRlIHRoaXMgaGFuZGxlciwgaWYgeW91IG5lZWQgYW5vdGhlciBiZWhhdmlvdXIuXG4gKiovXG5EZWZsYXRlLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgdGhpcy5jaHVua3MucHVzaChjaHVuayk7XG59O1xuXG5cbi8qKlxuICogRGVmbGF0ZSNvbkVuZChzdGF0dXMpIC0+IFZvaWRcbiAqIC0gc3RhdHVzIChOdW1iZXIpOiBkZWZsYXRlIHN0YXR1cy4gMCAoWl9PSykgb24gc3VjY2VzcyxcbiAqICAgb3RoZXIgaWYgbm90LlxuICpcbiAqIENhbGxlZCBvbmNlIGFmdGVyIHlvdSB0ZWxsIGRlZmxhdGUgdGhhdCB0aGUgaW5wdXQgc3RyZWFtIGlzXG4gKiBjb21wbGV0ZSAoWl9GSU5JU0gpIG9yIHNob3VsZCBiZSBmbHVzaGVkIChaX1NZTkNfRkxVU0gpXG4gKiBvciBpZiBhbiBlcnJvciBoYXBwZW5lZC4gQnkgZGVmYXVsdCAtIGpvaW4gY29sbGVjdGVkIGNodW5rcyxcbiAqIGZyZWUgbWVtb3J5IGFuZCBmaWxsIGByZXN1bHRzYCAvIGBlcnJgIHByb3BlcnRpZXMuXG4gKiovXG5EZWZsYXRlLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgLy8gT24gc3VjY2VzcyAtIGpvaW5cbiAgaWYgKHN0YXR1cyA9PT0gWl9PSykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHRoaXMuY2h1bmtzLmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc3VsdCA9IHV0aWxzLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpO1xuICAgIH1cbiAgfVxuICB0aGlzLmNodW5rcyA9IFtdO1xuICB0aGlzLmVyciA9IHN0YXR1cztcbiAgdGhpcy5tc2cgPSB0aGlzLnN0cm0ubXNnO1xufTtcblxuXG4vKipcbiAqIGRlZmxhdGUoZGF0YVssIG9wdGlvbnNdKSAtPiBVaW50OEFycmF5fEFycmF5fFN0cmluZ1xuICogLSBkYXRhIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IGlucHV0IGRhdGEgdG8gY29tcHJlc3MuXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHpsaWIgZGVmbGF0ZSBvcHRpb25zLlxuICpcbiAqIENvbXByZXNzIGBkYXRhYCB3aXRoIGRlZmxhdGUgYWxnb3JpdGhtIGFuZCBgb3B0aW9uc2AuXG4gKlxuICogU3VwcG9ydGVkIG9wdGlvbnMgYXJlOlxuICpcbiAqIC0gbGV2ZWxcbiAqIC0gd2luZG93Qml0c1xuICogLSBtZW1MZXZlbFxuICogLSBzdHJhdGVneVxuICogLSBkaWN0aW9uYXJ5XG4gKlxuICogW2h0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZF0oaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlc2UuXG4gKlxuICogU3VnYXIgKG9wdGlvbnMpOlxuICpcbiAqIC0gYHJhd2AgKEJvb2xlYW4pIC0gc2F5IHRoYXQgd2Ugd29yayB3aXRoIHJhdyBzdHJlYW0sIGlmIHlvdSBkb24ndCB3aXNoIHRvIHNwZWNpZnlcbiAqICAgbmVnYXRpdmUgd2luZG93Qml0cyBpbXBsaWNpdGx5LlxuICogLSBgdG9gIChTdHJpbmcpIC0gaWYgZXF1YWwgdG8gJ3N0cmluZycsIHRoZW4gcmVzdWx0IHdpbGwgYmUgXCJiaW5hcnkgc3RyaW5nXCJcbiAqICAgIChlYWNoIGNoYXIgY29kZSBbMC4uMjU1XSlcbiAqXG4gKiAjIyMjIyBFeGFtcGxlOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBwYWtvID0gcmVxdWlyZSgncGFrbycpXG4gKiAgICwgZGF0YSA9IFVpbnQ4QXJyYXkoWzEsMiwzLDQsNSw2LDcsOCw5XSk7XG4gKlxuICogY29uc29sZS5sb2cocGFrby5kZWZsYXRlKGRhdGEpKTtcbiAqIGBgYFxuICoqL1xuZnVuY3Rpb24gZGVmbGF0ZShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZGVmbGF0b3IgPSBuZXcgRGVmbGF0ZShvcHRpb25zKTtcblxuICBkZWZsYXRvci5wdXNoKGlucHV0LCB0cnVlKTtcblxuICAvLyBUaGF0IHdpbGwgbmV2ZXIgaGFwcGVucywgaWYgeW91IGRvbid0IGNoZWF0IHdpdGggb3B0aW9ucyA6KVxuICBpZiAoZGVmbGF0b3IuZXJyKSB7IHRocm93IGRlZmxhdG9yLm1zZyB8fCBtc2dbZGVmbGF0b3IuZXJyXTsgfVxuXG4gIHJldHVybiBkZWZsYXRvci5yZXN1bHQ7XG59XG5cblxuLyoqXG4gKiBkZWZsYXRlUmF3KGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBUaGUgc2FtZSBhcyBbW2RlZmxhdGVdXSwgYnV0IGNyZWF0ZXMgcmF3IGRhdGEsIHdpdGhvdXQgd3JhcHBlclxuICogKGhlYWRlciBhbmQgYWRsZXIzMiBjcmMpLlxuICoqL1xuZnVuY3Rpb24gZGVmbGF0ZVJhdyhpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5yYXcgPSB0cnVlO1xuICByZXR1cm4gZGVmbGF0ZShpbnB1dCwgb3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiBnemlwKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBUaGUgc2FtZSBhcyBbW2RlZmxhdGVdXSwgYnV0IGNyZWF0ZSBnemlwIHdyYXBwZXIgaW5zdGVhZCBvZlxuICogZGVmbGF0ZSBvbmUuXG4gKiovXG5mdW5jdGlvbiBnemlwKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLmd6aXAgPSB0cnVlO1xuICByZXR1cm4gZGVmbGF0ZShpbnB1dCwgb3B0aW9ucyk7XG59XG5cblxuZXhwb3J0cy5EZWZsYXRlID0gRGVmbGF0ZTtcbmV4cG9ydHMuZGVmbGF0ZSA9IGRlZmxhdGU7XG5leHBvcnRzLmRlZmxhdGVSYXcgPSBkZWZsYXRlUmF3O1xuZXhwb3J0cy5nemlwID0gZ3ppcDtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgemxpYl9pbmZsYXRlID0gcmVxdWlyZSgnLi96bGliL2luZmxhdGUnKTtcbnZhciB1dGlscyAgICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL2NvbW1vbicpO1xudmFyIHN0cmluZ3MgICAgICA9IHJlcXVpcmUoJy4vdXRpbHMvc3RyaW5ncycpO1xudmFyIGMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vemxpYi9jb25zdGFudHMnKTtcbnZhciBtc2cgICAgICAgICAgPSByZXF1aXJlKCcuL3psaWIvbWVzc2FnZXMnKTtcbnZhciBaU3RyZWFtICAgICAgPSByZXF1aXJlKCcuL3psaWIvenN0cmVhbScpO1xudmFyIEdaaGVhZGVyICAgICA9IHJlcXVpcmUoJy4vemxpYi9nemhlYWRlcicpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIGNsYXNzIEluZmxhdGVcbiAqXG4gKiBHZW5lcmljIEpTLXN0eWxlIHdyYXBwZXIgZm9yIHpsaWIgY2FsbHMuIElmIHlvdSBkb24ndCBuZWVkXG4gKiBzdHJlYW1pbmcgYmVoYXZpb3VyIC0gdXNlIG1vcmUgc2ltcGxlIGZ1bmN0aW9uczogW1tpbmZsYXRlXV1cbiAqIGFuZCBbW2luZmxhdGVSYXddXS5cbiAqKi9cblxuLyogaW50ZXJuYWxcbiAqIGluZmxhdGUuY2h1bmtzIC0+IEFycmF5XG4gKlxuICogQ2h1bmtzIG9mIG91dHB1dCBkYXRhLCBpZiBbW0luZmxhdGUjb25EYXRhXV0gbm90IG92ZXJyaWRkZW4uXG4gKiovXG5cbi8qKlxuICogSW5mbGF0ZS5yZXN1bHQgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqXG4gKiBVbmNvbXByZXNzZWQgcmVzdWx0LCBnZW5lcmF0ZWQgYnkgZGVmYXVsdCBbW0luZmxhdGUjb25EYXRhXV1cbiAqIGFuZCBbW0luZmxhdGUjb25FbmRdXSBoYW5kbGVycy4gRmlsbGVkIGFmdGVyIHlvdSBwdXNoIGxhc3QgY2h1bmtcbiAqIChjYWxsIFtbSW5mbGF0ZSNwdXNoXV0gd2l0aCBgWl9GSU5JU0hgIC8gYHRydWVgIHBhcmFtKSBvciBpZiB5b3VcbiAqIHB1c2ggYSBjaHVuayB3aXRoIGV4cGxpY2l0IGZsdXNoIChjYWxsIFtbSW5mbGF0ZSNwdXNoXV0gd2l0aFxuICogYFpfU1lOQ19GTFVTSGAgcGFyYW0pLlxuICoqL1xuXG4vKipcbiAqIEluZmxhdGUuZXJyIC0+IE51bWJlclxuICpcbiAqIEVycm9yIGNvZGUgYWZ0ZXIgaW5mbGF0ZSBmaW5pc2hlZC4gMCAoWl9PSykgb24gc3VjY2Vzcy5cbiAqIFNob3VsZCBiZSBjaGVja2VkIGlmIGJyb2tlbiBkYXRhIHBvc3NpYmxlLlxuICoqL1xuXG4vKipcbiAqIEluZmxhdGUubXNnIC0+IFN0cmluZ1xuICpcbiAqIEVycm9yIG1lc3NhZ2UsIGlmIFtbSW5mbGF0ZS5lcnJdXSAhPSAwXG4gKiovXG5cblxuLyoqXG4gKiBuZXcgSW5mbGF0ZShvcHRpb25zKVxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGluZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBDcmVhdGVzIG5ldyBpbmZsYXRvciBpbnN0YW5jZSB3aXRoIHNwZWNpZmllZCBwYXJhbXMuIFRocm93cyBleGNlcHRpb25cbiAqIG9uIGJhZCBwYXJhbXMuIFN1cHBvcnRlZCBvcHRpb25zOlxuICpcbiAqIC0gYHdpbmRvd0JpdHNgXG4gKiAtIGBkaWN0aW9uYXJ5YFxuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZXNlLlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucywgZm9yIGludGVybmFsIG5lZWRzOlxuICpcbiAqIC0gYGNodW5rU2l6ZWAgLSBzaXplIG9mIGdlbmVyYXRlZCBkYXRhIGNodW5rcyAoMTZLIGJ5IGRlZmF1bHQpXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIGRvIHJhdyBpbmZsYXRlXG4gKiAtIGB0b2AgKFN0cmluZykgLSBpZiBlcXVhbCB0byAnc3RyaW5nJywgdGhlbiByZXN1bHQgd2lsbCBiZSBjb252ZXJ0ZWRcbiAqICAgZnJvbSB1dGY4IHRvIHV0ZjE2IChqYXZhc2NyaXB0KSBzdHJpbmcuIFdoZW4gc3RyaW5nIG91dHB1dCByZXF1ZXN0ZWQsXG4gKiAgIGNodW5rIGxlbmd0aCBjYW4gZGlmZmVyIGZyb20gYGNodW5rU2l6ZWAsIGRlcGVuZGluZyBvbiBjb250ZW50LlxuICpcbiAqIEJ5IGRlZmF1bHQsIHdoZW4gbm8gb3B0aW9ucyBzZXQsIGF1dG9kZXRlY3QgZGVmbGF0ZS9nemlwIGRhdGEgZm9ybWF0IHZpYVxuICogd3JhcHBlciBoZWFkZXIuXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGNodW5rMSA9IFVpbnQ4QXJyYXkoWzEsMiwzLDQsNSw2LDcsOCw5XSlcbiAqICAgLCBjaHVuazIgPSBVaW50OEFycmF5KFsxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOV0pO1xuICpcbiAqIHZhciBpbmZsYXRlID0gbmV3IHBha28uSW5mbGF0ZSh7IGxldmVsOiAzfSk7XG4gKlxuICogaW5mbGF0ZS5wdXNoKGNodW5rMSwgZmFsc2UpO1xuICogaW5mbGF0ZS5wdXNoKGNodW5rMiwgdHJ1ZSk7ICAvLyB0cnVlIC0+IGxhc3QgY2h1bmtcbiAqXG4gKiBpZiAoaW5mbGF0ZS5lcnIpIHsgdGhyb3cgbmV3IEVycm9yKGluZmxhdGUuZXJyKTsgfVxuICpcbiAqIGNvbnNvbGUubG9nKGluZmxhdGUucmVzdWx0KTtcbiAqIGBgYFxuICoqL1xuZnVuY3Rpb24gSW5mbGF0ZShvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbmZsYXRlKSkgcmV0dXJuIG5ldyBJbmZsYXRlKG9wdGlvbnMpO1xuXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmFzc2lnbih7XG4gICAgY2h1bmtTaXplOiAxNjM4NCxcbiAgICB3aW5kb3dCaXRzOiAwLFxuICAgIHRvOiAnJ1xuICB9LCBvcHRpb25zIHx8IHt9KTtcblxuICB2YXIgb3B0ID0gdGhpcy5vcHRpb25zO1xuXG4gIC8vIEZvcmNlIHdpbmRvdyBzaXplIGZvciBgcmF3YCBkYXRhLCBpZiBub3Qgc2V0IGRpcmVjdGx5LFxuICAvLyBiZWNhdXNlIHdlIGhhdmUgbm8gaGVhZGVyIGZvciBhdXRvZGV0ZWN0LlxuICBpZiAob3B0LnJhdyAmJiAob3B0LndpbmRvd0JpdHMgPj0gMCkgJiYgKG9wdC53aW5kb3dCaXRzIDwgMTYpKSB7XG4gICAgb3B0LndpbmRvd0JpdHMgPSAtb3B0LndpbmRvd0JpdHM7XG4gICAgaWYgKG9wdC53aW5kb3dCaXRzID09PSAwKSB7IG9wdC53aW5kb3dCaXRzID0gLTE1OyB9XG4gIH1cblxuICAvLyBJZiBgd2luZG93Qml0c2Agbm90IGRlZmluZWQgKGFuZCBtb2RlIG5vdCByYXcpIC0gc2V0IGF1dG9kZXRlY3QgZmxhZyBmb3IgZ3ppcC9kZWZsYXRlXG4gIGlmICgob3B0LndpbmRvd0JpdHMgPj0gMCkgJiYgKG9wdC53aW5kb3dCaXRzIDwgMTYpICYmXG4gICAgICAhKG9wdGlvbnMgJiYgb3B0aW9ucy53aW5kb3dCaXRzKSkge1xuICAgIG9wdC53aW5kb3dCaXRzICs9IDMyO1xuICB9XG5cbiAgLy8gR3ppcCBoZWFkZXIgaGFzIG5vIGluZm8gYWJvdXQgd2luZG93cyBzaXplLCB3ZSBjYW4gZG8gYXV0b2RldGVjdCBvbmx5XG4gIC8vIGZvciBkZWZsYXRlLiBTbywgaWYgd2luZG93IHNpemUgbm90IHNldCwgZm9yY2UgaXQgdG8gbWF4IHdoZW4gZ3ppcCBwb3NzaWJsZVxuICBpZiAoKG9wdC53aW5kb3dCaXRzID4gMTUpICYmIChvcHQud2luZG93Qml0cyA8IDQ4KSkge1xuICAgIC8vIGJpdCAzICgxNikgLT4gZ3ppcHBlZCBkYXRhXG4gICAgLy8gYml0IDQgKDMyKSAtPiBhdXRvZGV0ZWN0IGd6aXAvZGVmbGF0ZVxuICAgIGlmICgob3B0LndpbmRvd0JpdHMgJiAxNSkgPT09IDApIHtcbiAgICAgIG9wdC53aW5kb3dCaXRzIHw9IDE1O1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuZXJyICAgID0gMDsgICAgICAvLyBlcnJvciBjb2RlLCBpZiBoYXBwZW5zICgwID0gWl9PSylcbiAgdGhpcy5tc2cgICAgPSAnJzsgICAgIC8vIGVycm9yIG1lc3NhZ2VcbiAgdGhpcy5lbmRlZCAgPSBmYWxzZTsgIC8vIHVzZWQgdG8gYXZvaWQgbXVsdGlwbGUgb25FbmQoKSBjYWxsc1xuICB0aGlzLmNodW5rcyA9IFtdOyAgICAgLy8gY2h1bmtzIG9mIGNvbXByZXNzZWQgZGF0YVxuXG4gIHRoaXMuc3RybSAgID0gbmV3IFpTdHJlYW0oKTtcbiAgdGhpcy5zdHJtLmF2YWlsX291dCA9IDA7XG5cbiAgdmFyIHN0YXR1cyAgPSB6bGliX2luZmxhdGUuaW5mbGF0ZUluaXQyKFxuICAgIHRoaXMuc3RybSxcbiAgICBvcHQud2luZG93Qml0c1xuICApO1xuXG4gIGlmIChzdGF0dXMgIT09IGMuWl9PSykge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2dbc3RhdHVzXSk7XG4gIH1cblxuICB0aGlzLmhlYWRlciA9IG5ldyBHWmhlYWRlcigpO1xuXG4gIHpsaWJfaW5mbGF0ZS5pbmZsYXRlR2V0SGVhZGVyKHRoaXMuc3RybSwgdGhpcy5oZWFkZXIpO1xufVxuXG4vKipcbiAqIEluZmxhdGUjcHVzaChkYXRhWywgbW9kZV0pIC0+IEJvb2xlYW5cbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxBcnJheUJ1ZmZlcnxTdHJpbmcpOiBpbnB1dCBkYXRhXG4gKiAtIG1vZGUgKE51bWJlcnxCb29sZWFuKTogMC4uNiBmb3IgY29ycmVzcG9uZGluZyBaX05PX0ZMVVNILi5aX1RSRUUgbW9kZXMuXG4gKiAgIFNlZSBjb25zdGFudHMuIFNraXBwZWQgb3IgYGZhbHNlYCBtZWFucyBaX05PX0ZMVVNILCBgdHJ1ZWAgbWVhbnMgWl9GSU5JU0guXG4gKlxuICogU2VuZHMgaW5wdXQgZGF0YSB0byBpbmZsYXRlIHBpcGUsIGdlbmVyYXRpbmcgW1tJbmZsYXRlI29uRGF0YV1dIGNhbGxzIHdpdGhcbiAqIG5ldyBvdXRwdXQgY2h1bmtzLiBSZXR1cm5zIGB0cnVlYCBvbiBzdWNjZXNzLiBUaGUgbGFzdCBkYXRhIGJsb2NrIG11c3QgaGF2ZVxuICogbW9kZSBaX0ZJTklTSCAob3IgYHRydWVgKS4gVGhhdCB3aWxsIGZsdXNoIGludGVybmFsIHBlbmRpbmcgYnVmZmVycyBhbmQgY2FsbFxuICogW1tJbmZsYXRlI29uRW5kXV0uIEZvciBpbnRlcmltIGV4cGxpY2l0IGZsdXNoZXMgKHdpdGhvdXQgZW5kaW5nIHRoZSBzdHJlYW0pIHlvdVxuICogY2FuIHVzZSBtb2RlIFpfU1lOQ19GTFVTSCwga2VlcGluZyB0aGUgZGVjb21wcmVzc2lvbiBjb250ZXh0LlxuICpcbiAqIE9uIGZhaWwgY2FsbCBbW0luZmxhdGUjb25FbmRdXSB3aXRoIGVycm9yIGNvZGUgYW5kIHJldHVybiBmYWxzZS5cbiAqXG4gKiBXZSBzdHJvbmdseSByZWNvbW1lbmQgdG8gdXNlIGBVaW50OEFycmF5YCBvbiBpbnB1dCBmb3IgYmVzdCBzcGVlZCAob3V0cHV0XG4gKiBmb3JtYXQgaXMgZGV0ZWN0ZWQgYXV0b21hdGljYWxseSkuIEFsc28sIGRvbid0IHNraXAgbGFzdCBwYXJhbSBhbmQgYWx3YXlzXG4gKiB1c2UgdGhlIHNhbWUgdHlwZSBpbiB5b3VyIGNvZGUgKGJvb2xlYW4gb3IgbnVtYmVyKS4gVGhhdCB3aWxsIGltcHJvdmUgSlMgc3BlZWQuXG4gKlxuICogRm9yIHJlZ3VsYXIgYEFycmF5YC1zIG1ha2Ugc3VyZSBhbGwgZWxlbWVudHMgYXJlIFswLi4yNTVdLlxuICpcbiAqICMjIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBwdXNoKGNodW5rLCBmYWxzZSk7IC8vIHB1c2ggb25lIG9mIGRhdGEgY2h1bmtzXG4gKiAuLi5cbiAqIHB1c2goY2h1bmssIHRydWUpOyAgLy8gcHVzaCBsYXN0IGNodW5rXG4gKiBgYGBcbiAqKi9cbkluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgbW9kZSkge1xuICB2YXIgc3RybSA9IHRoaXMuc3RybTtcbiAgdmFyIGNodW5rU2l6ZSA9IHRoaXMub3B0aW9ucy5jaHVua1NpemU7XG4gIHZhciBkaWN0aW9uYXJ5ID0gdGhpcy5vcHRpb25zLmRpY3Rpb25hcnk7XG4gIHZhciBzdGF0dXMsIF9tb2RlO1xuICB2YXIgbmV4dF9vdXRfdXRmOCwgdGFpbCwgdXRmOHN0cjtcbiAgdmFyIGRpY3Q7XG5cbiAgLy8gRmxhZyB0byBwcm9wZXJseSBwcm9jZXNzIFpfQlVGX0VSUk9SIG9uIHRlc3RpbmcgaW5mbGF0ZSBjYWxsXG4gIC8vIHdoZW4gd2UgY2hlY2sgdGhhdCBhbGwgb3V0cHV0IGRhdGEgd2FzIGZsdXNoZWQuXG4gIHZhciBhbGxvd0J1ZkVycm9yID0gZmFsc2U7XG5cbiAgaWYgKHRoaXMuZW5kZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIF9tb2RlID0gKG1vZGUgPT09IH5+bW9kZSkgPyBtb2RlIDogKChtb2RlID09PSB0cnVlKSA/IGMuWl9GSU5JU0ggOiBjLlpfTk9fRkxVU0gpO1xuXG4gIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIC8vIE9ubHkgYmluYXJ5IHN0cmluZ3MgY2FuIGJlIGRlY29tcHJlc3NlZCBvbiBwcmFjdGljZVxuICAgIHN0cm0uaW5wdXQgPSBzdHJpbmdzLmJpbnN0cmluZzJidWYoZGF0YSk7XG4gIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgIHN0cm0uaW5wdXQgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJtLmlucHV0ID0gZGF0YTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uYXZhaWxfaW4gPSBzdHJtLmlucHV0Lmxlbmd0aDtcblxuICBkbyB7XG4gICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBzdHJtLm91dHB1dCA9IG5ldyB1dGlscy5CdWY4KGNodW5rU2l6ZSk7XG4gICAgICBzdHJtLm5leHRfb3V0ID0gMDtcbiAgICAgIHN0cm0uYXZhaWxfb3V0ID0gY2h1bmtTaXplO1xuICAgIH1cblxuICAgIHN0YXR1cyA9IHpsaWJfaW5mbGF0ZS5pbmZsYXRlKHN0cm0sIGMuWl9OT19GTFVTSCk7ICAgIC8qIG5vIGJhZCByZXR1cm4gdmFsdWUgKi9cblxuICAgIGlmIChzdGF0dXMgPT09IGMuWl9ORUVEX0RJQ1QgJiYgZGljdGlvbmFyeSkge1xuICAgICAgLy8gQ29udmVydCBkYXRhIGlmIG5lZWRlZFxuICAgICAgaWYgKHR5cGVvZiBkaWN0aW9uYXJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBkaWN0ID0gc3RyaW5ncy5zdHJpbmcyYnVmKGRpY3Rpb25hcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b1N0cmluZy5jYWxsKGRpY3Rpb25hcnkpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG4gICAgICAgIGRpY3QgPSBuZXcgVWludDhBcnJheShkaWN0aW9uYXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpY3QgPSBkaWN0aW9uYXJ5O1xuICAgICAgfVxuXG4gICAgICBzdGF0dXMgPSB6bGliX2luZmxhdGUuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLCBkaWN0KTtcblxuICAgIH1cblxuICAgIGlmIChzdGF0dXMgPT09IGMuWl9CVUZfRVJST1IgJiYgYWxsb3dCdWZFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgc3RhdHVzID0gYy5aX09LO1xuICAgICAgYWxsb3dCdWZFcnJvciA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzdGF0dXMgIT09IGMuWl9TVFJFQU1fRU5EICYmIHN0YXR1cyAhPT0gYy5aX09LKSB7XG4gICAgICB0aGlzLm9uRW5kKHN0YXR1cyk7XG4gICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc3RybS5uZXh0X291dCkge1xuICAgICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwIHx8IHN0YXR1cyA9PT0gYy5aX1NUUkVBTV9FTkQgfHwgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgKF9tb2RlID09PSBjLlpfRklOSVNIIHx8IF9tb2RlID09PSBjLlpfU1lOQ19GTFVTSCkpKSB7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50byA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICAgIG5leHRfb3V0X3V0ZjggPSBzdHJpbmdzLnV0Zjhib3JkZXIoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpO1xuXG4gICAgICAgICAgdGFpbCA9IHN0cm0ubmV4dF9vdXQgLSBuZXh0X291dF91dGY4O1xuICAgICAgICAgIHV0ZjhzdHIgPSBzdHJpbmdzLmJ1ZjJzdHJpbmcoc3RybS5vdXRwdXQsIG5leHRfb3V0X3V0ZjgpO1xuXG4gICAgICAgICAgLy8gbW92ZSB0YWlsXG4gICAgICAgICAgc3RybS5uZXh0X291dCA9IHRhaWw7XG4gICAgICAgICAgc3RybS5hdmFpbF9vdXQgPSBjaHVua1NpemUgLSB0YWlsO1xuICAgICAgICAgIGlmICh0YWlsKSB7IHV0aWxzLmFycmF5U2V0KHN0cm0ub3V0cHV0LCBzdHJtLm91dHB1dCwgbmV4dF9vdXRfdXRmOCwgdGFpbCwgMCk7IH1cblxuICAgICAgICAgIHRoaXMub25EYXRhKHV0ZjhzdHIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkRhdGEodXRpbHMuc2hyaW5rQnVmKHN0cm0ub3V0cHV0LCBzdHJtLm5leHRfb3V0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIG5vIG1vcmUgaW5wdXQgZGF0YSwgd2Ugc2hvdWxkIGNoZWNrIHRoYXQgaW50ZXJuYWwgaW5mbGF0ZSBidWZmZXJzXG4gICAgLy8gYXJlIGZsdXNoZWQuIFRoZSBvbmx5IHdheSB0byBkbyBpdCB3aGVuIGF2YWlsX291dCA9IDAgLSBydW4gb25lIG1vcmVcbiAgICAvLyBpbmZsYXRlIHBhc3MuIEJ1dCBpZiBvdXRwdXQgZGF0YSBub3QgZXhpc3RzLCBpbmZsYXRlIHJldHVybiBaX0JVRl9FUlJPUi5cbiAgICAvLyBIZXJlIHdlIHNldCBmbGFnIHRvIHByb2Nlc3MgdGhpcyBlcnJvciBwcm9wZXJseS5cbiAgICAvL1xuICAgIC8vIE5PVEUuIERlZmxhdGUgZG9lcyBub3QgcmV0dXJuIGVycm9yIGluIHRoaXMgY2FzZSBhbmQgZG9lcyBub3QgbmVlZHMgc3VjaFxuICAgIC8vIGxvZ2ljLlxuICAgIGlmIChzdHJtLmF2YWlsX2luID09PSAwICYmIHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBhbGxvd0J1ZkVycm9yID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSB3aGlsZSAoKHN0cm0uYXZhaWxfaW4gPiAwIHx8IHN0cm0uYXZhaWxfb3V0ID09PSAwKSAmJiBzdGF0dXMgIT09IGMuWl9TVFJFQU1fRU5EKTtcblxuICBpZiAoc3RhdHVzID09PSBjLlpfU1RSRUFNX0VORCkge1xuICAgIF9tb2RlID0gYy5aX0ZJTklTSDtcbiAgfVxuXG4gIC8vIEZpbmFsaXplIG9uIHRoZSBsYXN0IGNodW5rLlxuICBpZiAoX21vZGUgPT09IGMuWl9GSU5JU0gpIHtcbiAgICBzdGF0dXMgPSB6bGliX2luZmxhdGUuaW5mbGF0ZUVuZCh0aGlzLnN0cm0pO1xuICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gc3RhdHVzID09PSBjLlpfT0s7XG4gIH1cblxuICAvLyBjYWxsYmFjayBpbnRlcmltIHJlc3VsdHMgaWYgWl9TWU5DX0ZMVVNILlxuICBpZiAoX21vZGUgPT09IGMuWl9TWU5DX0ZMVVNIKSB7XG4gICAgdGhpcy5vbkVuZChjLlpfT0spO1xuICAgIHN0cm0uYXZhaWxfb3V0ID0gMDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuXG4vKipcbiAqIEluZmxhdGUjb25EYXRhKGNodW5rKSAtPiBWb2lkXG4gKiAtIGNodW5rIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IG91dHB1dCBkYXRhLiBUeXBlIG9mIGFycmF5IGRlcGVuZHNcbiAqICAgb24ganMgZW5naW5lIHN1cHBvcnQuIFdoZW4gc3RyaW5nIG91dHB1dCByZXF1ZXN0ZWQsIGVhY2ggY2h1bmtcbiAqICAgd2lsbCBiZSBzdHJpbmcuXG4gKlxuICogQnkgZGVmYXVsdCwgc3RvcmVzIGRhdGEgYmxvY2tzIGluIGBjaHVua3NbXWAgcHJvcGVydHkgYW5kIGdsdWVcbiAqIHRob3NlIGluIGBvbkVuZGAuIE92ZXJyaWRlIHRoaXMgaGFuZGxlciwgaWYgeW91IG5lZWQgYW5vdGhlciBiZWhhdmlvdXIuXG4gKiovXG5JbmZsYXRlLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgdGhpcy5jaHVua3MucHVzaChjaHVuayk7XG59O1xuXG5cbi8qKlxuICogSW5mbGF0ZSNvbkVuZChzdGF0dXMpIC0+IFZvaWRcbiAqIC0gc3RhdHVzIChOdW1iZXIpOiBpbmZsYXRlIHN0YXR1cy4gMCAoWl9PSykgb24gc3VjY2VzcyxcbiAqICAgb3RoZXIgaWYgbm90LlxuICpcbiAqIENhbGxlZCBlaXRoZXIgYWZ0ZXIgeW91IHRlbGwgaW5mbGF0ZSB0aGF0IHRoZSBpbnB1dCBzdHJlYW0gaXNcbiAqIGNvbXBsZXRlIChaX0ZJTklTSCkgb3Igc2hvdWxkIGJlIGZsdXNoZWQgKFpfU1lOQ19GTFVTSClcbiAqIG9yIGlmIGFuIGVycm9yIGhhcHBlbmVkLiBCeSBkZWZhdWx0IC0gam9pbiBjb2xsZWN0ZWQgY2h1bmtzLFxuICogZnJlZSBtZW1vcnkgYW5kIGZpbGwgYHJlc3VsdHNgIC8gYGVycmAgcHJvcGVydGllcy5cbiAqKi9cbkluZmxhdGUucHJvdG90eXBlLm9uRW5kID0gZnVuY3Rpb24gKHN0YXR1cykge1xuICAvLyBPbiBzdWNjZXNzIC0gam9pblxuICBpZiAoc3RhdHVzID09PSBjLlpfT0spIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRvID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gR2x1ZSAmIGNvbnZlcnQgaGVyZSwgdW50aWwgd2UgdGVhY2ggcGFrbyB0byBzZW5kXG4gICAgICAvLyB1dGY4IGFsaWduZWQgc3RyaW5ncyB0byBvbkRhdGFcbiAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5jaHVua3Muam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzdWx0ID0gdXRpbHMuZmxhdHRlbkNodW5rcyh0aGlzLmNodW5rcyk7XG4gICAgfVxuICB9XG4gIHRoaXMuY2h1bmtzID0gW107XG4gIHRoaXMuZXJyID0gc3RhdHVzO1xuICB0aGlzLm1zZyA9IHRoaXMuc3RybS5tc2c7XG59O1xuXG5cbi8qKlxuICogaW5mbGF0ZShkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBkZWNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGluZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBEZWNvbXByZXNzIGBkYXRhYCB3aXRoIGluZmxhdGUvdW5nemlwIGFuZCBgb3B0aW9uc2AuIEF1dG9kZXRlY3RcbiAqIGZvcm1hdCB2aWEgd3JhcHBlciBoZWFkZXIgYnkgZGVmYXVsdC4gVGhhdCdzIHdoeSB3ZSBkb24ndCBwcm92aWRlXG4gKiBzZXBhcmF0ZSBgdW5nemlwYCBtZXRob2QuXG4gKlxuICogU3VwcG9ydGVkIG9wdGlvbnMgYXJlOlxuICpcbiAqIC0gd2luZG93Qml0c1xuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIFN1Z2FyIChvcHRpb25zKTpcbiAqXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIHNheSB0aGF0IHdlIHdvcmsgd2l0aCByYXcgc3RyZWFtLCBpZiB5b3UgZG9uJ3Qgd2lzaCB0byBzcGVjaWZ5XG4gKiAgIG5lZ2F0aXZlIHdpbmRvd0JpdHMgaW1wbGljaXRseS5cbiAqIC0gYHRvYCAoU3RyaW5nKSAtIGlmIGVxdWFsIHRvICdzdHJpbmcnLCB0aGVuIHJlc3VsdCB3aWxsIGJlIGNvbnZlcnRlZFxuICogICBmcm9tIHV0ZjggdG8gdXRmMTYgKGphdmFzY3JpcHQpIHN0cmluZy4gV2hlbiBzdHJpbmcgb3V0cHV0IHJlcXVlc3RlZCxcbiAqICAgY2h1bmsgbGVuZ3RoIGNhbiBkaWZmZXIgZnJvbSBgY2h1bmtTaXplYCwgZGVwZW5kaW5nIG9uIGNvbnRlbnQuXG4gKlxuICpcbiAqICMjIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBha28gPSByZXF1aXJlKCdwYWtvJylcbiAqICAgLCBpbnB1dCA9IHBha28uZGVmbGF0ZShbMSwyLDMsNCw1LDYsNyw4LDldKVxuICogICAsIG91dHB1dDtcbiAqXG4gKiB0cnkge1xuICogICBvdXRwdXQgPSBwYWtvLmluZmxhdGUoaW5wdXQpO1xuICogfSBjYXRjaCAoZXJyKVxuICogICBjb25zb2xlLmxvZyhlcnIpO1xuICogfVxuICogYGBgXG4gKiovXG5mdW5jdGlvbiBpbmZsYXRlKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBpbmZsYXRvciA9IG5ldyBJbmZsYXRlKG9wdGlvbnMpO1xuXG4gIGluZmxhdG9yLnB1c2goaW5wdXQsIHRydWUpO1xuXG4gIC8vIFRoYXQgd2lsbCBuZXZlciBoYXBwZW5zLCBpZiB5b3UgZG9uJ3QgY2hlYXQgd2l0aCBvcHRpb25zIDopXG4gIGlmIChpbmZsYXRvci5lcnIpIHsgdGhyb3cgaW5mbGF0b3IubXNnIHx8IG1zZ1tpbmZsYXRvci5lcnJdOyB9XG5cbiAgcmV0dXJuIGluZmxhdG9yLnJlc3VsdDtcbn1cblxuXG4vKipcbiAqIGluZmxhdGVSYXcoZGF0YVssIG9wdGlvbnNdKSAtPiBVaW50OEFycmF5fEFycmF5fFN0cmluZ1xuICogLSBkYXRhIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IGlucHV0IGRhdGEgdG8gZGVjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBpbmZsYXRlIG9wdGlvbnMuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tpbmZsYXRlXV0sIGJ1dCBjcmVhdGVzIHJhdyBkYXRhLCB3aXRob3V0IHdyYXBwZXJcbiAqIChoZWFkZXIgYW5kIGFkbGVyMzIgY3JjKS5cbiAqKi9cbmZ1bmN0aW9uIGluZmxhdGVSYXcoaW5wdXQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMucmF3ID0gdHJ1ZTtcbiAgcmV0dXJuIGluZmxhdGUoaW5wdXQsIG9wdGlvbnMpO1xufVxuXG5cbi8qKlxuICogdW5nemlwKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGRlY29tcHJlc3MuXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHpsaWIgaW5mbGF0ZSBvcHRpb25zLlxuICpcbiAqIEp1c3Qgc2hvcnRjdXQgdG8gW1tpbmZsYXRlXV0sIGJlY2F1c2UgaXQgYXV0b2RldGVjdHMgZm9ybWF0XG4gKiBieSBoZWFkZXIuY29udGVudC4gRG9uZSBmb3IgY29udmVuaWVuY2UuXG4gKiovXG5cblxuZXhwb3J0cy5JbmZsYXRlID0gSW5mbGF0ZTtcbmV4cG9ydHMuaW5mbGF0ZSA9IGluZmxhdGU7XG5leHBvcnRzLmluZmxhdGVSYXcgPSBpbmZsYXRlUmF3O1xuZXhwb3J0cy51bmd6aXAgID0gaW5mbGF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgVFlQRURfT0sgPSAgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIFVpbnQxNkFycmF5ICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIEludDMyQXJyYXkgIT09ICd1bmRlZmluZWQnKTtcblxuZnVuY3Rpb24gX2hhcyhvYmosIGtleSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxuZXhwb3J0cy5hc3NpZ24gPSBmdW5jdGlvbiAob2JqIC8qZnJvbTEsIGZyb20yLCBmcm9tMywgLi4uKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB3aGlsZSAoc291cmNlcy5sZW5ndGgpIHtcbiAgICB2YXIgc291cmNlID0gc291cmNlcy5zaGlmdCgpO1xuICAgIGlmICghc291cmNlKSB7IGNvbnRpbnVlOyB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3Ioc291cmNlICsgJ211c3QgYmUgbm9uLW9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAodmFyIHAgaW4gc291cmNlKSB7XG4gICAgICBpZiAoX2hhcyhzb3VyY2UsIHApKSB7XG4gICAgICAgIG9ialtwXSA9IHNvdXJjZVtwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLyByZWR1Y2UgYnVmZmVyIHNpemUsIGF2b2lkaW5nIG1lbSBjb3B5XG5leHBvcnRzLnNocmlua0J1ZiA9IGZ1bmN0aW9uIChidWYsIHNpemUpIHtcbiAgaWYgKGJ1Zi5sZW5ndGggPT09IHNpemUpIHsgcmV0dXJuIGJ1ZjsgfVxuICBpZiAoYnVmLnN1YmFycmF5KSB7IHJldHVybiBidWYuc3ViYXJyYXkoMCwgc2l6ZSk7IH1cbiAgYnVmLmxlbmd0aCA9IHNpemU7XG4gIHJldHVybiBidWY7XG59O1xuXG5cbnZhciBmblR5cGVkID0ge1xuICBhcnJheVNldDogZnVuY3Rpb24gKGRlc3QsIHNyYywgc3JjX29mZnMsIGxlbiwgZGVzdF9vZmZzKSB7XG4gICAgaWYgKHNyYy5zdWJhcnJheSAmJiBkZXN0LnN1YmFycmF5KSB7XG4gICAgICBkZXN0LnNldChzcmMuc3ViYXJyYXkoc3JjX29mZnMsIHNyY19vZmZzICsgbGVuKSwgZGVzdF9vZmZzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gb3JkaW5hcnkgYXJyYXlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0W2Rlc3Rfb2ZmcyArIGldID0gc3JjW3NyY19vZmZzICsgaV07XG4gICAgfVxuICB9LFxuICAvLyBKb2luIGFycmF5IG9mIGNodW5rcyB0byBzaW5nbGUgYXJyYXkuXG4gIGZsYXR0ZW5DaHVua3M6IGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICB2YXIgaSwgbCwgbGVuLCBwb3MsIGNodW5rLCByZXN1bHQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgZGF0YSBsZW5ndGhcbiAgICBsZW4gPSAwO1xuICAgIGZvciAoaSA9IDAsIGwgPSBjaHVua3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZW4gKz0gY2h1bmtzW2ldLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBqb2luIGNodW5rc1xuICAgIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGxlbik7XG4gICAgcG9zID0gMDtcbiAgICBmb3IgKGkgPSAwLCBsID0gY2h1bmtzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2h1bmsgPSBjaHVua3NbaV07XG4gICAgICByZXN1bHQuc2V0KGNodW5rLCBwb3MpO1xuICAgICAgcG9zICs9IGNodW5rLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG52YXIgZm5VbnR5cGVkID0ge1xuICBhcnJheVNldDogZnVuY3Rpb24gKGRlc3QsIHNyYywgc3JjX29mZnMsIGxlbiwgZGVzdF9vZmZzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGVzdFtkZXN0X29mZnMgKyBpXSA9IHNyY1tzcmNfb2ZmcyArIGldO1xuICAgIH1cbiAgfSxcbiAgLy8gSm9pbiBhcnJheSBvZiBjaHVua3MgdG8gc2luZ2xlIGFycmF5LlxuICBmbGF0dGVuQ2h1bmtzOiBmdW5jdGlvbiAoY2h1bmtzKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgY2h1bmtzKTtcbiAgfVxufTtcblxuXG4vLyBFbmFibGUvRGlzYWJsZSB0eXBlZCBhcnJheXMgdXNlLCBmb3IgdGVzdGluZ1xuLy9cbmV4cG9ydHMuc2V0VHlwZWQgPSBmdW5jdGlvbiAob24pIHtcbiAgaWYgKG9uKSB7XG4gICAgZXhwb3J0cy5CdWY4ICA9IFVpbnQ4QXJyYXk7XG4gICAgZXhwb3J0cy5CdWYxNiA9IFVpbnQxNkFycmF5O1xuICAgIGV4cG9ydHMuQnVmMzIgPSBJbnQzMkFycmF5O1xuICAgIGV4cG9ydHMuYXNzaWduKGV4cG9ydHMsIGZuVHlwZWQpO1xuICB9IGVsc2Uge1xuICAgIGV4cG9ydHMuQnVmOCAgPSBBcnJheTtcbiAgICBleHBvcnRzLkJ1ZjE2ID0gQXJyYXk7XG4gICAgZXhwb3J0cy5CdWYzMiA9IEFycmF5O1xuICAgIGV4cG9ydHMuYXNzaWduKGV4cG9ydHMsIGZuVW50eXBlZCk7XG4gIH1cbn07XG5cbmV4cG9ydHMuc2V0VHlwZWQoVFlQRURfT0spO1xuIiwiLy8gU3RyaW5nIGVuY29kZS9kZWNvZGUgaGVscGVyc1xuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cblxuLy8gUXVpY2sgY2hlY2sgaWYgd2UgY2FuIHVzZSBmYXN0IGFycmF5IHRvIGJpbiBzdHJpbmcgY29udmVyc2lvblxuLy9cbi8vIC0gYXBwbHkoQXJyYXkpIGNhbiBmYWlsIG9uIEFuZHJvaWQgMi4yXG4vLyAtIGFwcGx5KFVpbnQ4QXJyYXkpIGNhbiBmYWlsIG9uIGlPUyA1LjEgU2FmYXJpXG4vL1xudmFyIFNUUl9BUFBMWV9PSyA9IHRydWU7XG52YXIgU1RSX0FQUExZX1VJQV9PSyA9IHRydWU7XG5cbnRyeSB7IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgWyAwIF0pOyB9IGNhdGNoIChfXykgeyBTVFJfQVBQTFlfT0sgPSBmYWxzZTsgfVxudHJ5IHsgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSgxKSk7IH0gY2F0Y2ggKF9fKSB7IFNUUl9BUFBMWV9VSUFfT0sgPSBmYWxzZTsgfVxuXG5cbi8vIFRhYmxlIHdpdGggdXRmOCBsZW5ndGhzIChjYWxjdWxhdGVkIGJ5IGZpcnN0IGJ5dGUgb2Ygc2VxdWVuY2UpXG4vLyBOb3RlLCB0aGF0IDUgJiA2LWJ5dGUgdmFsdWVzIGFuZCBzb21lIDQtYnl0ZSB2YWx1ZXMgY2FuIG5vdCBiZSByZXByZXNlbnRlZCBpbiBKUyxcbi8vIGJlY2F1c2UgbWF4IHBvc3NpYmxlIGNvZGVwb2ludCBpcyAweDEwZmZmZlxudmFyIF91dGY4bGVuID0gbmV3IHV0aWxzLkJ1ZjgoMjU2KTtcbmZvciAodmFyIHEgPSAwOyBxIDwgMjU2OyBxKyspIHtcbiAgX3V0ZjhsZW5bcV0gPSAocSA+PSAyNTIgPyA2IDogcSA+PSAyNDggPyA1IDogcSA+PSAyNDAgPyA0IDogcSA+PSAyMjQgPyAzIDogcSA+PSAxOTIgPyAyIDogMSk7XG59XG5fdXRmOGxlblsyNTRdID0gX3V0ZjhsZW5bMjU0XSA9IDE7IC8vIEludmFsaWQgc2VxdWVuY2Ugc3RhcnRcblxuXG4vLyBjb252ZXJ0IHN0cmluZyB0byBhcnJheSAodHlwZWQsIHdoZW4gcG9zc2libGUpXG5leHBvcnRzLnN0cmluZzJidWYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBidWYsIGMsIGMyLCBtX3BvcywgaSwgc3RyX2xlbiA9IHN0ci5sZW5ndGgsIGJ1Zl9sZW4gPSAwO1xuXG4gIC8vIGNvdW50IGJpbmFyeSBzaXplXG4gIGZvciAobV9wb3MgPSAwOyBtX3BvcyA8IHN0cl9sZW47IG1fcG9zKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQobV9wb3MpO1xuICAgIGlmICgoYyAmIDB4ZmMwMCkgPT09IDB4ZDgwMCAmJiAobV9wb3MgKyAxIDwgc3RyX2xlbikpIHtcbiAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQobV9wb3MgKyAxKTtcbiAgICAgIGlmICgoYzIgJiAweGZjMDApID09PSAweGRjMDApIHtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgLSAweGQ4MDApIDw8IDEwKSArIChjMiAtIDB4ZGMwMCk7XG4gICAgICAgIG1fcG9zKys7XG4gICAgICB9XG4gICAgfVxuICAgIGJ1Zl9sZW4gKz0gYyA8IDB4ODAgPyAxIDogYyA8IDB4ODAwID8gMiA6IGMgPCAweDEwMDAwID8gMyA6IDQ7XG4gIH1cblxuICAvLyBhbGxvY2F0ZSBidWZmZXJcbiAgYnVmID0gbmV3IHV0aWxzLkJ1ZjgoYnVmX2xlbik7XG5cbiAgLy8gY29udmVydFxuICBmb3IgKGkgPSAwLCBtX3BvcyA9IDA7IGkgPCBidWZfbGVuOyBtX3BvcysrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zKTtcbiAgICBpZiAoKGMgJiAweGZjMDApID09PSAweGQ4MDAgJiYgKG1fcG9zICsgMSA8IHN0cl9sZW4pKSB7XG4gICAgICBjMiA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zICsgMSk7XG4gICAgICBpZiAoKGMyICYgMHhmYzAwKSA9PT0gMHhkYzAwKSB7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKChjIC0gMHhkODAwKSA8PCAxMCkgKyAoYzIgLSAweGRjMDApO1xuICAgICAgICBtX3BvcysrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgIC8qIG9uZSBieXRlICovXG4gICAgICBidWZbaSsrXSA9IGM7XG4gICAgfSBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgIC8qIHR3byBieXRlcyAqL1xuICAgICAgYnVmW2krK10gPSAweEMwIHwgKGMgPj4+IDYpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDEwMDAwKSB7XG4gICAgICAvKiB0aHJlZSBieXRlcyAqL1xuICAgICAgYnVmW2krK10gPSAweEUwIHwgKGMgPj4+IDEyKTtcbiAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjID4+PiA2ICYgMHgzZik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyAmIDB4M2YpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICBidWZbaSsrXSA9IDB4ZjAgfCAoYyA+Pj4gMTgpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgPj4+IDEyICYgMHgzZik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyA+Pj4gNiAmIDB4M2YpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmO1xufTtcblxuLy8gSGVscGVyICh1c2VkIGluIDIgcGxhY2VzKVxuZnVuY3Rpb24gYnVmMmJpbnN0cmluZyhidWYsIGxlbikge1xuICAvLyB1c2UgZmFsbGJhY2sgZm9yIGJpZyBhcnJheXMgdG8gYXZvaWQgc3RhY2sgb3ZlcmZsb3dcbiAgaWYgKGxlbiA8IDY1NTM3KSB7XG4gICAgaWYgKChidWYuc3ViYXJyYXkgJiYgU1RSX0FQUExZX1VJQV9PSykgfHwgKCFidWYuc3ViYXJyYXkgJiYgU1RSX0FQUExZX09LKSkge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdXRpbHMuc2hyaW5rQnVmKGJ1ZiwgbGVuKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbi8vIENvbnZlcnQgYnl0ZSBhcnJheSB0byBiaW5hcnkgc3RyaW5nXG5leHBvcnRzLmJ1ZjJiaW5zdHJpbmcgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIHJldHVybiBidWYyYmluc3RyaW5nKGJ1ZiwgYnVmLmxlbmd0aCk7XG59O1xuXG5cbi8vIENvbnZlcnQgYmluYXJ5IHN0cmluZyAodHlwZWQsIHdoZW4gcG9zc2libGUpXG5leHBvcnRzLmJpbnN0cmluZzJidWYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBidWYgPSBuZXcgdXRpbHMuQnVmOChzdHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGJ1ZltpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBidWY7XG59O1xuXG5cbi8vIGNvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXG5leHBvcnRzLmJ1ZjJzdHJpbmcgPSBmdW5jdGlvbiAoYnVmLCBtYXgpIHtcbiAgdmFyIGksIG91dCwgYywgY19sZW47XG4gIHZhciBsZW4gPSBtYXggfHwgYnVmLmxlbmd0aDtcblxuICAvLyBSZXNlcnZlIG1heCBwb3NzaWJsZSBsZW5ndGggKDIgd29yZHMgcGVyIGNoYXIpXG4gIC8vIE5COiBieSB1bmtub3duIHJlYXNvbnMsIEFycmF5IGlzIHNpZ25pZmljYW50bHkgZmFzdGVyIGZvclxuICAvLyAgICAgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSB0aGFuIFVpbnQxNkFycmF5LlxuICB2YXIgdXRmMTZidWYgPSBuZXcgQXJyYXkobGVuICogMik7XG5cbiAgZm9yIChvdXQgPSAwLCBpID0gMDsgaSA8IGxlbjspIHtcbiAgICBjID0gYnVmW2krK107XG4gICAgLy8gcXVpY2sgcHJvY2VzcyBhc2NpaVxuICAgIGlmIChjIDwgMHg4MCkgeyB1dGYxNmJ1ZltvdXQrK10gPSBjOyBjb250aW51ZTsgfVxuXG4gICAgY19sZW4gPSBfdXRmOGxlbltjXTtcbiAgICAvLyBza2lwIDUgJiA2IGJ5dGUgY29kZXNcbiAgICBpZiAoY19sZW4gPiA0KSB7IHV0ZjE2YnVmW291dCsrXSA9IDB4ZmZmZDsgaSArPSBjX2xlbiAtIDE7IGNvbnRpbnVlOyB9XG5cbiAgICAvLyBhcHBseSBtYXNrIG9uIGZpcnN0IGJ5dGVcbiAgICBjICY9IGNfbGVuID09PSAyID8gMHgxZiA6IGNfbGVuID09PSAzID8gMHgwZiA6IDB4MDc7XG4gICAgLy8gam9pbiB0aGUgcmVzdFxuICAgIHdoaWxlIChjX2xlbiA+IDEgJiYgaSA8IGxlbikge1xuICAgICAgYyA9IChjIDw8IDYpIHwgKGJ1ZltpKytdICYgMHgzZik7XG4gICAgICBjX2xlbi0tO1xuICAgIH1cblxuICAgIC8vIHRlcm1pbmF0ZWQgYnkgZW5kIG9mIHN0cmluZz9cbiAgICBpZiAoY19sZW4gPiAxKSB7IHV0ZjE2YnVmW291dCsrXSA9IDB4ZmZmZDsgY29udGludWU7IH1cblxuICAgIGlmIChjIDwgMHgxMDAwMCkge1xuICAgICAgdXRmMTZidWZbb3V0KytdID0gYztcbiAgICB9IGVsc2Uge1xuICAgICAgYyAtPSAweDEwMDAwO1xuICAgICAgdXRmMTZidWZbb3V0KytdID0gMHhkODAwIHwgKChjID4+IDEwKSAmIDB4M2ZmKTtcbiAgICAgIHV0ZjE2YnVmW291dCsrXSA9IDB4ZGMwMCB8IChjICYgMHgzZmYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYyYmluc3RyaW5nKHV0ZjE2YnVmLCBvdXQpO1xufTtcblxuXG4vLyBDYWxjdWxhdGUgbWF4IHBvc3NpYmxlIHBvc2l0aW9uIGluIHV0ZjggYnVmZmVyLFxuLy8gdGhhdCB3aWxsIG5vdCBicmVhayBzZXF1ZW5jZS4gSWYgdGhhdCdzIG5vdCBwb3NzaWJsZVxuLy8gLSAodmVyeSBzbWFsbCBsaW1pdHMpIHJldHVybiBtYXggc2l6ZSBhcyBpcy5cbi8vXG4vLyBidWZbXSAtIHV0ZjggYnl0ZXMgYXJyYXlcbi8vIG1heCAgIC0gbGVuZ3RoIGxpbWl0IChtYW5kYXRvcnkpO1xuZXhwb3J0cy51dGY4Ym9yZGVyID0gZnVuY3Rpb24gKGJ1ZiwgbWF4KSB7XG4gIHZhciBwb3M7XG5cbiAgbWF4ID0gbWF4IHx8IGJ1Zi5sZW5ndGg7XG4gIGlmIChtYXggPiBidWYubGVuZ3RoKSB7IG1heCA9IGJ1Zi5sZW5ndGg7IH1cblxuICAvLyBnbyBiYWNrIGZyb20gbGFzdCBwb3NpdGlvbiwgdW50aWwgc3RhcnQgb2Ygc2VxdWVuY2UgZm91bmRcbiAgcG9zID0gbWF4IC0gMTtcbiAgd2hpbGUgKHBvcyA+PSAwICYmIChidWZbcG9zXSAmIDB4QzApID09PSAweDgwKSB7IHBvcy0tOyB9XG5cbiAgLy8gVmVyeSBzbWFsbCBhbmQgYnJva2VuIHNlcXVlbmNlLFxuICAvLyByZXR1cm4gbWF4LCBiZWNhdXNlIHdlIHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheS5cbiAgaWYgKHBvcyA8IDApIHsgcmV0dXJuIG1heDsgfVxuXG4gIC8vIElmIHdlIGNhbWUgdG8gc3RhcnQgb2YgYnVmZmVyIC0gdGhhdCBtZWFucyBidWZmZXIgaXMgdG9vIHNtYWxsLFxuICAvLyByZXR1cm4gbWF4IHRvby5cbiAgaWYgKHBvcyA9PT0gMCkgeyByZXR1cm4gbWF4OyB9XG5cbiAgcmV0dXJuIChwb3MgKyBfdXRmOGxlbltidWZbcG9zXV0gPiBtYXgpID8gcG9zIDogbWF4O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gTm90ZTogYWRsZXIzMiB0YWtlcyAxMiUgZm9yIGxldmVsIDAgYW5kIDIlIGZvciBsZXZlbCA2LlxuLy8gSXQgaXNuJ3Qgd29ydGggaXQgdG8gbWFrZSBhZGRpdGlvbmFsIG9wdGltaXphdGlvbnMgYXMgaW4gb3JpZ2luYWwuXG4vLyBTbWFsbCBzaXplIGlzIHByZWZlcmFibGUuXG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuZnVuY3Rpb24gYWRsZXIzMihhZGxlciwgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgczEgPSAoYWRsZXIgJiAweGZmZmYpIHwwLFxuICAgICAgczIgPSAoKGFkbGVyID4+PiAxNikgJiAweGZmZmYpIHwwLFxuICAgICAgbiA9IDA7XG5cbiAgd2hpbGUgKGxlbiAhPT0gMCkge1xuICAgIC8vIFNldCBsaW1pdCB+IHR3aWNlIGxlc3MgdGhhbiA1NTUyLCB0byBrZWVwXG4gICAgLy8gczIgaW4gMzEtYml0cywgYmVjYXVzZSB3ZSBmb3JjZSBzaWduZWQgaW50cy5cbiAgICAvLyBpbiBvdGhlciBjYXNlICU9IHdpbGwgZmFpbC5cbiAgICBuID0gbGVuID4gMjAwMCA/IDIwMDAgOiBsZW47XG4gICAgbGVuIC09IG47XG5cbiAgICBkbyB7XG4gICAgICBzMSA9IChzMSArIGJ1Zltwb3MrK10pIHwwO1xuICAgICAgczIgPSAoczIgKyBzMSkgfDA7XG4gICAgfSB3aGlsZSAoLS1uKTtcblxuICAgIHMxICU9IDY1NTIxO1xuICAgIHMyICU9IDY1NTIxO1xuICB9XG5cbiAgcmV0dXJuIChzMSB8IChzMiA8PCAxNikpIHwwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWRsZXIzMjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKiBBbGxvd2VkIGZsdXNoIHZhbHVlczsgc2VlIGRlZmxhdGUoKSBhbmQgaW5mbGF0ZSgpIGJlbG93IGZvciBkZXRhaWxzICovXG4gIFpfTk9fRkxVU0g6ICAgICAgICAgMCxcbiAgWl9QQVJUSUFMX0ZMVVNIOiAgICAxLFxuICBaX1NZTkNfRkxVU0g6ICAgICAgIDIsXG4gIFpfRlVMTF9GTFVTSDogICAgICAgMyxcbiAgWl9GSU5JU0g6ICAgICAgICAgICA0LFxuICBaX0JMT0NLOiAgICAgICAgICAgIDUsXG4gIFpfVFJFRVM6ICAgICAgICAgICAgNixcblxuICAvKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gICogYXJlIGVycm9ycywgcG9zaXRpdmUgdmFsdWVzIGFyZSB1c2VkIGZvciBzcGVjaWFsIGJ1dCBub3JtYWwgZXZlbnRzLlxuICAqL1xuICBaX09LOiAgICAgICAgICAgICAgIDAsXG4gIFpfU1RSRUFNX0VORDogICAgICAgMSxcbiAgWl9ORUVEX0RJQ1Q6ICAgICAgICAyLFxuICBaX0VSUk5POiAgICAgICAgICAgLTEsXG4gIFpfU1RSRUFNX0VSUk9SOiAgICAtMixcbiAgWl9EQVRBX0VSUk9SOiAgICAgIC0zLFxuICAvL1pfTUVNX0VSUk9SOiAgICAgLTQsXG4gIFpfQlVGX0VSUk9SOiAgICAgICAtNSxcbiAgLy9aX1ZFUlNJT05fRVJST1I6IC02LFxuXG4gIC8qIGNvbXByZXNzaW9uIGxldmVscyAqL1xuICBaX05PX0NPTVBSRVNTSU9OOiAgICAgICAgIDAsXG4gIFpfQkVTVF9TUEVFRDogICAgICAgICAgICAgMSxcbiAgWl9CRVNUX0NPTVBSRVNTSU9OOiAgICAgICA5LFxuICBaX0RFRkFVTFRfQ09NUFJFU1NJT046ICAgLTEsXG5cblxuICBaX0ZJTFRFUkVEOiAgICAgICAgICAgICAgIDEsXG4gIFpfSFVGRk1BTl9PTkxZOiAgICAgICAgICAgMixcbiAgWl9STEU6ICAgICAgICAgICAgICAgICAgICAzLFxuICBaX0ZJWEVEOiAgICAgICAgICAgICAgICAgIDQsXG4gIFpfREVGQVVMVF9TVFJBVEVHWTogICAgICAgMCxcblxuICAvKiBQb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIGRhdGFfdHlwZSBmaWVsZCAodGhvdWdoIHNlZSBpbmZsYXRlKCkpICovXG4gIFpfQklOQVJZOiAgICAgICAgICAgICAgICAgMCxcbiAgWl9URVhUOiAgICAgICAgICAgICAgICAgICAxLFxuICAvL1pfQVNDSUk6ICAgICAgICAgICAgICAgIDEsIC8vID0gWl9URVhUIChkZXByZWNhdGVkKVxuICBaX1VOS05PV046ICAgICAgICAgICAgICAgIDIsXG5cbiAgLyogVGhlIGRlZmxhdGUgY29tcHJlc3Npb24gbWV0aG9kICovXG4gIFpfREVGTEFURUQ6ICAgICAgICAgICAgICAgOFxuICAvL1pfTlVMTDogICAgICAgICAgICAgICAgIG51bGwgLy8gVXNlIC0xIG9yIG51bGwgaW5saW5lLCBkZXBlbmRpbmcgb24gdmFyIHR5cGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIE5vdGU6IHdlIGNhbid0IGdldCBzaWduaWZpY2FudCBzcGVlZCBib29zdCBoZXJlLlxuLy8gU28gd3JpdGUgY29kZSB0byBtaW5pbWl6ZSBzaXplIC0gbm8gcHJlZ2VuZXJhdGVkIHRhYmxlc1xuLy8gYW5kIGFycmF5IHRvb2xzIGRlcGVuZGVuY2llcy5cblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG4vLyBVc2Ugb3JkaW5hcnkgYXJyYXksIHNpbmNlIHVudHlwZWQgbWFrZXMgbm8gYm9vc3QgaGVyZVxuZnVuY3Rpb24gbWFrZVRhYmxlKCkge1xuICB2YXIgYywgdGFibGUgPSBbXTtcblxuICBmb3IgKHZhciBuID0gMDsgbiA8IDI1NjsgbisrKSB7XG4gICAgYyA9IG47XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCA4OyBrKyspIHtcbiAgICAgIGMgPSAoKGMgJiAxKSA/ICgweEVEQjg4MzIwIF4gKGMgPj4+IDEpKSA6IChjID4+PiAxKSk7XG4gICAgfVxuICAgIHRhYmxlW25dID0gYztcbiAgfVxuXG4gIHJldHVybiB0YWJsZTtcbn1cblxuLy8gQ3JlYXRlIHRhYmxlIG9uIGxvYWQuIEp1c3QgMjU1IHNpZ25lZCBsb25ncy4gTm90IGEgcHJvYmxlbS5cbnZhciBjcmNUYWJsZSA9IG1ha2VUYWJsZSgpO1xuXG5cbmZ1bmN0aW9uIGNyYzMyKGNyYywgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgdCA9IGNyY1RhYmxlLFxuICAgICAgZW5kID0gcG9zICsgbGVuO1xuXG4gIGNyYyBePSAtMTtcblxuICBmb3IgKHZhciBpID0gcG9zOyBpIDwgZW5kOyBpKyspIHtcbiAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHRbKGNyYyBeIGJ1ZltpXSkgJiAweEZGXTtcbiAgfVxuXG4gIHJldHVybiAoY3JjIF4gKC0xKSk7IC8vID4+PiAwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY3JjMzI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxudmFyIHV0aWxzICAgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcbnZhciB0cmVlcyAgID0gcmVxdWlyZSgnLi90cmVlcycpO1xudmFyIGFkbGVyMzIgPSByZXF1aXJlKCcuL2FkbGVyMzInKTtcbnZhciBjcmMzMiAgID0gcmVxdWlyZSgnLi9jcmMzMicpO1xudmFyIG1zZyAgICAgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qIEFsbG93ZWQgZmx1c2ggdmFsdWVzOyBzZWUgZGVmbGF0ZSgpIGFuZCBpbmZsYXRlKCkgYmVsb3cgZm9yIGRldGFpbHMgKi9cbnZhciBaX05PX0ZMVVNIICAgICAgPSAwO1xudmFyIFpfUEFSVElBTF9GTFVTSCA9IDE7XG4vL3ZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xudmFyIFpfRlVMTF9GTFVTSCAgICA9IDM7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcbnZhciBaX0JMT0NLICAgICAgICAgPSA1O1xuLy92YXIgWl9UUkVFUyAgICAgICAgID0gNjtcblxuXG4vKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gKiBhcmUgZXJyb3JzLCBwb3NpdGl2ZSB2YWx1ZXMgYXJlIHVzZWQgZm9yIHNwZWNpYWwgYnV0IG5vcm1hbCBldmVudHMuXG4gKi9cbnZhciBaX09LICAgICAgICAgICAgPSAwO1xudmFyIFpfU1RSRUFNX0VORCAgICA9IDE7XG4vL3ZhciBaX05FRURfRElDVCAgICAgPSAyO1xuLy92YXIgWl9FUlJOTyAgICAgICAgID0gLTE7XG52YXIgWl9TVFJFQU1fRVJST1IgID0gLTI7XG52YXIgWl9EQVRBX0VSUk9SICAgID0gLTM7XG4vL3ZhciBaX01FTV9FUlJPUiAgICAgPSAtNDtcbnZhciBaX0JVRl9FUlJPUiAgICAgPSAtNTtcbi8vdmFyIFpfVkVSU0lPTl9FUlJPUiA9IC02O1xuXG5cbi8qIGNvbXByZXNzaW9uIGxldmVscyAqL1xuLy92YXIgWl9OT19DT01QUkVTU0lPTiAgICAgID0gMDtcbi8vdmFyIFpfQkVTVF9TUEVFRCAgICAgICAgICA9IDE7XG4vL3ZhciBaX0JFU1RfQ09NUFJFU1NJT04gICAgPSA5O1xudmFyIFpfREVGQVVMVF9DT01QUkVTU0lPTiA9IC0xO1xuXG5cbnZhciBaX0ZJTFRFUkVEICAgICAgICAgICAgPSAxO1xudmFyIFpfSFVGRk1BTl9PTkxZICAgICAgICA9IDI7XG52YXIgWl9STEUgICAgICAgICAgICAgICAgID0gMztcbnZhciBaX0ZJWEVEICAgICAgICAgICAgICAgPSA0O1xudmFyIFpfREVGQVVMVF9TVFJBVEVHWSAgICA9IDA7XG5cbi8qIFBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgZGF0YV90eXBlIGZpZWxkICh0aG91Z2ggc2VlIGluZmxhdGUoKSkgKi9cbi8vdmFyIFpfQklOQVJZICAgICAgICAgICAgICA9IDA7XG4vL3ZhciBaX1RFWFQgICAgICAgICAgICAgICAgPSAxO1xuLy92YXIgWl9BU0NJSSAgICAgICAgICAgICAgID0gMTsgLy8gPSBaX1RFWFRcbnZhciBaX1VOS05PV04gICAgICAgICAgICAgPSAyO1xuXG5cbi8qIFRoZSBkZWZsYXRlIGNvbXByZXNzaW9uIG1ldGhvZCAqL1xudmFyIFpfREVGTEFURUQgID0gODtcblxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG52YXIgTUFYX01FTV9MRVZFTCA9IDk7XG4vKiBNYXhpbXVtIHZhbHVlIGZvciBtZW1MZXZlbCBpbiBkZWZsYXRlSW5pdDIgKi9cbnZhciBNQVhfV0JJVFMgPSAxNTtcbi8qIDMySyBMWjc3IHdpbmRvdyAqL1xudmFyIERFRl9NRU1fTEVWRUwgPSA4O1xuXG5cbnZhciBMRU5HVEhfQ09ERVMgID0gMjk7XG4vKiBudW1iZXIgb2YgbGVuZ3RoIGNvZGVzLCBub3QgY291bnRpbmcgdGhlIHNwZWNpYWwgRU5EX0JMT0NLIGNvZGUgKi9cbnZhciBMSVRFUkFMUyAgICAgID0gMjU2O1xuLyogbnVtYmVyIG9mIGxpdGVyYWwgYnl0ZXMgMC4uMjU1ICovXG52YXIgTF9DT0RFUyAgICAgICA9IExJVEVSQUxTICsgMSArIExFTkdUSF9DT0RFUztcbi8qIG51bWJlciBvZiBMaXRlcmFsIG9yIExlbmd0aCBjb2RlcywgaW5jbHVkaW5nIHRoZSBFTkRfQkxPQ0sgY29kZSAqL1xudmFyIERfQ09ERVMgICAgICAgPSAzMDtcbi8qIG51bWJlciBvZiBkaXN0YW5jZSBjb2RlcyAqL1xudmFyIEJMX0NPREVTICAgICAgPSAxOTtcbi8qIG51bWJlciBvZiBjb2RlcyB1c2VkIHRvIHRyYW5zZmVyIHRoZSBiaXQgbGVuZ3RocyAqL1xudmFyIEhFQVBfU0laRSAgICAgPSAyICogTF9DT0RFUyArIDE7XG4vKiBtYXhpbXVtIGhlYXAgc2l6ZSAqL1xudmFyIE1BWF9CSVRTICA9IDE1O1xuLyogQWxsIGNvZGVzIG11c3Qgbm90IGV4Y2VlZCBNQVhfQklUUyBiaXRzICovXG5cbnZhciBNSU5fTUFUQ0ggPSAzO1xudmFyIE1BWF9NQVRDSCA9IDI1ODtcbnZhciBNSU5fTE9PS0FIRUFEID0gKE1BWF9NQVRDSCArIE1JTl9NQVRDSCArIDEpO1xuXG52YXIgUFJFU0VUX0RJQ1QgPSAweDIwO1xuXG52YXIgSU5JVF9TVEFURSA9IDQyO1xudmFyIEVYVFJBX1NUQVRFID0gNjk7XG52YXIgTkFNRV9TVEFURSA9IDczO1xudmFyIENPTU1FTlRfU1RBVEUgPSA5MTtcbnZhciBIQ1JDX1NUQVRFID0gMTAzO1xudmFyIEJVU1lfU1RBVEUgPSAxMTM7XG52YXIgRklOSVNIX1NUQVRFID0gNjY2O1xuXG52YXIgQlNfTkVFRF9NT1JFICAgICAgPSAxOyAvKiBibG9jayBub3QgY29tcGxldGVkLCBuZWVkIG1vcmUgaW5wdXQgb3IgbW9yZSBvdXRwdXQgKi9cbnZhciBCU19CTE9DS19ET05FICAgICA9IDI7IC8qIGJsb2NrIGZsdXNoIHBlcmZvcm1lZCAqL1xudmFyIEJTX0ZJTklTSF9TVEFSVEVEID0gMzsgLyogZmluaXNoIHN0YXJ0ZWQsIG5lZWQgb25seSBtb3JlIG91dHB1dCBhdCBuZXh0IGRlZmxhdGUgKi9cbnZhciBCU19GSU5JU0hfRE9ORSAgICA9IDQ7IC8qIGZpbmlzaCBkb25lLCBhY2NlcHQgbm8gbW9yZSBpbnB1dCBvciBvdXRwdXQgKi9cblxudmFyIE9TX0NPREUgPSAweDAzOyAvLyBVbml4IDopIC4gRG9uJ3QgZGV0ZWN0LCB1c2UgdGhpcyBkZWZhdWx0LlxuXG5mdW5jdGlvbiBlcnIoc3RybSwgZXJyb3JDb2RlKSB7XG4gIHN0cm0ubXNnID0gbXNnW2Vycm9yQ29kZV07XG4gIHJldHVybiBlcnJvckNvZGU7XG59XG5cbmZ1bmN0aW9uIHJhbmsoZikge1xuICByZXR1cm4gKChmKSA8PCAxKSAtICgoZikgPiA0ID8gOSA6IDApO1xufVxuXG5mdW5jdGlvbiB6ZXJvKGJ1ZikgeyB2YXIgbGVuID0gYnVmLmxlbmd0aDsgd2hpbGUgKC0tbGVuID49IDApIHsgYnVmW2xlbl0gPSAwOyB9IH1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlLiBBbGwgZGVmbGF0ZSgpIG91dHB1dCBnb2VzXG4gKiB0aHJvdWdoIHRoaXMgZnVuY3Rpb24gc28gc29tZSBhcHBsaWNhdGlvbnMgbWF5IHdpc2ggdG8gbW9kaWZ5IGl0XG4gKiB0byBhdm9pZCBhbGxvY2F0aW5nIGEgbGFyZ2Ugc3RybS0+b3V0cHV0IGJ1ZmZlciBhbmQgY29weWluZyBpbnRvIGl0LlxuICogKFNlZSBhbHNvIHJlYWRfYnVmKCkpLlxuICovXG5mdW5jdGlvbiBmbHVzaF9wZW5kaW5nKHN0cm0pIHtcbiAgdmFyIHMgPSBzdHJtLnN0YXRlO1xuXG4gIC8vX3RyX2ZsdXNoX2JpdHMocyk7XG4gIHZhciBsZW4gPSBzLnBlbmRpbmc7XG4gIGlmIChsZW4gPiBzdHJtLmF2YWlsX291dCkge1xuICAgIGxlbiA9IHN0cm0uYXZhaWxfb3V0O1xuICB9XG4gIGlmIChsZW4gPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgdXRpbHMuYXJyYXlTZXQoc3RybS5vdXRwdXQsIHMucGVuZGluZ19idWYsIHMucGVuZGluZ19vdXQsIGxlbiwgc3RybS5uZXh0X291dCk7XG4gIHN0cm0ubmV4dF9vdXQgKz0gbGVuO1xuICBzLnBlbmRpbmdfb3V0ICs9IGxlbjtcbiAgc3RybS50b3RhbF9vdXQgKz0gbGVuO1xuICBzdHJtLmF2YWlsX291dCAtPSBsZW47XG4gIHMucGVuZGluZyAtPSBsZW47XG4gIGlmIChzLnBlbmRpbmcgPT09IDApIHtcbiAgICBzLnBlbmRpbmdfb3V0ID0gMDtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGZsdXNoX2Jsb2NrX29ubHkocywgbGFzdCkge1xuICB0cmVlcy5fdHJfZmx1c2hfYmxvY2socywgKHMuYmxvY2tfc3RhcnQgPj0gMCA/IHMuYmxvY2tfc3RhcnQgOiAtMSksIHMuc3Ryc3RhcnQgLSBzLmJsb2NrX3N0YXJ0LCBsYXN0KTtcbiAgcy5ibG9ja19zdGFydCA9IHMuc3Ryc3RhcnQ7XG4gIGZsdXNoX3BlbmRpbmcocy5zdHJtKTtcbn1cblxuXG5mdW5jdGlvbiBwdXRfYnl0ZShzLCBiKSB7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gYjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBQdXQgYSBzaG9ydCBpbiB0aGUgcGVuZGluZyBidWZmZXIuIFRoZSAxNi1iaXQgdmFsdWUgaXMgcHV0IGluIE1TQiBvcmRlci5cbiAqIElOIGFzc2VydGlvbjogdGhlIHN0cmVhbSBzdGF0ZSBpcyBjb3JyZWN0IGFuZCB0aGVyZSBpcyBlbm91Z2ggcm9vbSBpblxuICogcGVuZGluZ19idWYuXG4gKi9cbmZ1bmN0aW9uIHB1dFNob3J0TVNCKHMsIGIpIHtcbi8vICBwdXRfYnl0ZShzLCAoQnl0ZSkoYiA+PiA4KSk7XG4vLyAgcHV0X2J5dGUocywgKEJ5dGUpKGIgJiAweGZmKSk7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gKGIgPj4+IDgpICYgMHhmZjtcbiAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSBiICYgMHhmZjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFJlYWQgYSBuZXcgYnVmZmVyIGZyb20gdGhlIGN1cnJlbnQgaW5wdXQgc3RyZWFtLCB1cGRhdGUgdGhlIGFkbGVyMzJcbiAqIGFuZCB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC4gIEFsbCBkZWZsYXRlKCkgaW5wdXQgZ29lcyB0aHJvdWdoXG4gKiB0aGlzIGZ1bmN0aW9uIHNvIHNvbWUgYXBwbGljYXRpb25zIG1heSB3aXNoIHRvIG1vZGlmeSBpdCB0byBhdm9pZFxuICogYWxsb2NhdGluZyBhIGxhcmdlIHN0cm0tPmlucHV0IGJ1ZmZlciBhbmQgY29weWluZyBmcm9tIGl0LlxuICogKFNlZSBhbHNvIGZsdXNoX3BlbmRpbmcoKSkuXG4gKi9cbmZ1bmN0aW9uIHJlYWRfYnVmKHN0cm0sIGJ1Ziwgc3RhcnQsIHNpemUpIHtcbiAgdmFyIGxlbiA9IHN0cm0uYXZhaWxfaW47XG5cbiAgaWYgKGxlbiA+IHNpemUpIHsgbGVuID0gc2l6ZTsgfVxuICBpZiAobGVuID09PSAwKSB7IHJldHVybiAwOyB9XG5cbiAgc3RybS5hdmFpbF9pbiAtPSBsZW47XG5cbiAgLy8gem1lbWNweShidWYsIHN0cm0tPm5leHRfaW4sIGxlbik7XG4gIHV0aWxzLmFycmF5U2V0KGJ1Ziwgc3RybS5pbnB1dCwgc3RybS5uZXh0X2luLCBsZW4sIHN0YXJ0KTtcbiAgaWYgKHN0cm0uc3RhdGUud3JhcCA9PT0gMSkge1xuICAgIHN0cm0uYWRsZXIgPSBhZGxlcjMyKHN0cm0uYWRsZXIsIGJ1ZiwgbGVuLCBzdGFydCk7XG4gIH1cblxuICBlbHNlIGlmIChzdHJtLnN0YXRlLndyYXAgPT09IDIpIHtcbiAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgYnVmLCBsZW4sIHN0YXJ0KTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiArPSBsZW47XG4gIHN0cm0udG90YWxfaW4gKz0gbGVuO1xuXG4gIHJldHVybiBsZW47XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZXQgbWF0Y2hfc3RhcnQgdG8gdGhlIGxvbmdlc3QgbWF0Y2ggc3RhcnRpbmcgYXQgdGhlIGdpdmVuIHN0cmluZyBhbmRcbiAqIHJldHVybiBpdHMgbGVuZ3RoLiBNYXRjaGVzIHNob3J0ZXIgb3IgZXF1YWwgdG8gcHJldl9sZW5ndGggYXJlIGRpc2NhcmRlZCxcbiAqIGluIHdoaWNoIGNhc2UgdGhlIHJlc3VsdCBpcyBlcXVhbCB0byBwcmV2X2xlbmd0aCBhbmQgbWF0Y2hfc3RhcnQgaXNcbiAqIGdhcmJhZ2UuXG4gKiBJTiBhc3NlcnRpb25zOiBjdXJfbWF0Y2ggaXMgdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW4gZm9yIHRoZSBjdXJyZW50XG4gKiAgIHN0cmluZyAoc3Ryc3RhcnQpIGFuZCBpdHMgZGlzdGFuY2UgaXMgPD0gTUFYX0RJU1QsIGFuZCBwcmV2X2xlbmd0aCA+PSAxXG4gKiBPVVQgYXNzZXJ0aW9uOiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIG5vdCBncmVhdGVyIHRoYW4gcy0+bG9va2FoZWFkLlxuICovXG5mdW5jdGlvbiBsb25nZXN0X21hdGNoKHMsIGN1cl9tYXRjaCkge1xuICB2YXIgY2hhaW5fbGVuZ3RoID0gcy5tYXhfY2hhaW5fbGVuZ3RoOyAgICAgIC8qIG1heCBoYXNoIGNoYWluIGxlbmd0aCAqL1xuICB2YXIgc2NhbiA9IHMuc3Ryc3RhcnQ7IC8qIGN1cnJlbnQgc3RyaW5nICovXG4gIHZhciBtYXRjaDsgICAgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoZWQgc3RyaW5nICovXG4gIHZhciBsZW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIG9mIGN1cnJlbnQgbWF0Y2ggKi9cbiAgdmFyIGJlc3RfbGVuID0gcy5wcmV2X2xlbmd0aDsgICAgICAgICAgICAgIC8qIGJlc3QgbWF0Y2ggbGVuZ3RoIHNvIGZhciAqL1xuICB2YXIgbmljZV9tYXRjaCA9IHMubmljZV9tYXRjaDsgICAgICAgICAgICAgLyogc3RvcCBpZiBtYXRjaCBsb25nIGVub3VnaCAqL1xuICB2YXIgbGltaXQgPSAocy5zdHJzdGFydCA+IChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpKSA/XG4gICAgICBzLnN0cnN0YXJ0IC0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkgOiAwLypOSUwqLztcblxuICB2YXIgX3dpbiA9IHMud2luZG93OyAvLyBzaG9ydGN1dFxuXG4gIHZhciB3bWFzayA9IHMud19tYXNrO1xuICB2YXIgcHJldiAgPSBzLnByZXY7XG5cbiAgLyogU3RvcCB3aGVuIGN1cl9tYXRjaCBiZWNvbWVzIDw9IGxpbWl0LiBUbyBzaW1wbGlmeSB0aGUgY29kZSxcbiAgICogd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZyBvZiB3aW5kb3cgaW5kZXggMC5cbiAgICovXG5cbiAgdmFyIHN0cmVuZCA9IHMuc3Ryc3RhcnQgKyBNQVhfTUFUQ0g7XG4gIHZhciBzY2FuX2VuZDEgID0gX3dpbltzY2FuICsgYmVzdF9sZW4gLSAxXTtcbiAgdmFyIHNjYW5fZW5kICAgPSBfd2luW3NjYW4gKyBiZXN0X2xlbl07XG5cbiAgLyogVGhlIGNvZGUgaXMgb3B0aW1pemVkIGZvciBIQVNIX0JJVFMgPj0gOCBhbmQgTUFYX01BVENILTIgbXVsdGlwbGUgb2YgMTYuXG4gICAqIEl0IGlzIGVhc3kgdG8gZ2V0IHJpZCBvZiB0aGlzIG9wdGltaXphdGlvbiBpZiBuZWNlc3NhcnkuXG4gICAqL1xuICAvLyBBc3NlcnQocy0+aGFzaF9iaXRzID49IDggJiYgTUFYX01BVENIID09IDI1OCwgXCJDb2RlIHRvbyBjbGV2ZXJcIik7XG5cbiAgLyogRG8gbm90IHdhc3RlIHRvbyBtdWNoIHRpbWUgaWYgd2UgYWxyZWFkeSBoYXZlIGEgZ29vZCBtYXRjaDogKi9cbiAgaWYgKHMucHJldl9sZW5ndGggPj0gcy5nb29kX21hdGNoKSB7XG4gICAgY2hhaW5fbGVuZ3RoID4+PSAyO1xuICB9XG4gIC8qIERvIG5vdCBsb29rIGZvciBtYXRjaGVzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBpbnB1dC4gVGhpcyBpcyBuZWNlc3NhcnlcbiAgICogdG8gbWFrZSBkZWZsYXRlIGRldGVybWluaXN0aWMuXG4gICAqL1xuICBpZiAobmljZV9tYXRjaCA+IHMubG9va2FoZWFkKSB7IG5pY2VfbWF0Y2ggPSBzLmxvb2thaGVhZDsgfVxuXG4gIC8vIEFzc2VydCgodWxnKXMtPnN0cnN0YXJ0IDw9IHMtPndpbmRvd19zaXplLU1JTl9MT09LQUhFQUQsIFwibmVlZCBsb29rYWhlYWRcIik7XG5cbiAgZG8ge1xuICAgIC8vIEFzc2VydChjdXJfbWF0Y2ggPCBzLT5zdHJzdGFydCwgXCJubyBmdXR1cmVcIik7XG4gICAgbWF0Y2ggPSBjdXJfbWF0Y2g7XG5cbiAgICAvKiBTa2lwIHRvIG5leHQgbWF0Y2ggaWYgdGhlIG1hdGNoIGxlbmd0aCBjYW5ub3QgaW5jcmVhc2VcbiAgICAgKiBvciBpZiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIGxlc3MgdGhhbiAyLiAgTm90ZSB0aGF0IHRoZSBjaGVja3MgYmVsb3dcbiAgICAgKiBmb3IgaW5zdWZmaWNpZW50IGxvb2thaGVhZCBvbmx5IG9jY3VyIG9jY2FzaW9uYWxseSBmb3IgcGVyZm9ybWFuY2VcbiAgICAgKiByZWFzb25zLiAgVGhlcmVmb3JlIHVuaW5pdGlhbGl6ZWQgbWVtb3J5IHdpbGwgYmUgYWNjZXNzZWQsIGFuZFxuICAgICAqIGNvbmRpdGlvbmFsIGp1bXBzIHdpbGwgYmUgbWFkZSB0aGF0IGRlcGVuZCBvbiB0aG9zZSB2YWx1ZXMuXG4gICAgICogSG93ZXZlciB0aGUgbGVuZ3RoIG9mIHRoZSBtYXRjaCBpcyBsaW1pdGVkIHRvIHRoZSBsb29rYWhlYWQsIHNvXG4gICAgICogdGhlIG91dHB1dCBvZiBkZWZsYXRlIGlzIG5vdCBhZmZlY3RlZCBieSB0aGUgdW5pbml0aWFsaXplZCB2YWx1ZXMuXG4gICAgICovXG5cbiAgICBpZiAoX3dpblttYXRjaCArIGJlc3RfbGVuXSAgICAgIT09IHNjYW5fZW5kICB8fFxuICAgICAgICBfd2luW21hdGNoICsgYmVzdF9sZW4gLSAxXSAhPT0gc2Nhbl9lbmQxIHx8XG4gICAgICAgIF93aW5bbWF0Y2hdICAgICAgICAgICAgICAgICE9PSBfd2luW3NjYW5dIHx8XG4gICAgICAgIF93aW5bKyttYXRjaF0gICAgICAgICAgICAgICE9PSBfd2luW3NjYW4gKyAxXSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyogVGhlIGNoZWNrIGF0IGJlc3RfbGVuLTEgY2FuIGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3aWxsIGJlIG1hZGVcbiAgICAgKiBhZ2FpbiBsYXRlci4gKFRoaXMgaGV1cmlzdGljIGlzIG5vdCBhbHdheXMgYSB3aW4uKVxuICAgICAqIEl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gY29tcGFyZSBzY2FuWzJdIGFuZCBtYXRjaFsyXSBzaW5jZSB0aGV5XG4gICAgICogYXJlIGFsd2F5cyBlcXVhbCB3aGVuIHRoZSBvdGhlciBieXRlcyBtYXRjaCwgZ2l2ZW4gdGhhdFxuICAgICAqIHRoZSBoYXNoIGtleXMgYXJlIGVxdWFsIGFuZCB0aGF0IEhBU0hfQklUUyA+PSA4LlxuICAgICAqL1xuICAgIHNjYW4gKz0gMjtcbiAgICBtYXRjaCsrO1xuICAgIC8vIEFzc2VydCgqc2NhbiA9PSAqbWF0Y2gsIFwibWF0Y2hbMl0/XCIpO1xuXG4gICAgLyogV2UgY2hlY2sgZm9yIGluc3VmZmljaWVudCBsb29rYWhlYWQgb25seSBldmVyeSA4dGggY29tcGFyaXNvbjtcbiAgICAgKiB0aGUgMjU2dGggY2hlY2sgd2lsbCBiZSBtYWRlIGF0IHN0cnN0YXJ0KzI1OC5cbiAgICAgKi9cbiAgICBkbyB7XG4gICAgICAvKmpzaGludCBub2VtcHR5OmZhbHNlKi9cbiAgICB9IHdoaWxlIChfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJlxuICAgICAgICAgICAgIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJiBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiZcbiAgICAgICAgICAgICBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgc2NhbiA8IHN0cmVuZCk7XG5cbiAgICAvLyBBc3NlcnQoc2NhbiA8PSBzLT53aW5kb3crKHVuc2lnbmVkKShzLT53aW5kb3dfc2l6ZS0xKSwgXCJ3aWxkIHNjYW5cIik7XG5cbiAgICBsZW4gPSBNQVhfTUFUQ0ggLSAoc3RyZW5kIC0gc2Nhbik7XG4gICAgc2NhbiA9IHN0cmVuZCAtIE1BWF9NQVRDSDtcblxuICAgIGlmIChsZW4gPiBiZXN0X2xlbikge1xuICAgICAgcy5tYXRjaF9zdGFydCA9IGN1cl9tYXRjaDtcbiAgICAgIGJlc3RfbGVuID0gbGVuO1xuICAgICAgaWYgKGxlbiA+PSBuaWNlX21hdGNoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc2Nhbl9lbmQxICA9IF93aW5bc2NhbiArIGJlc3RfbGVuIC0gMV07XG4gICAgICBzY2FuX2VuZCAgID0gX3dpbltzY2FuICsgYmVzdF9sZW5dO1xuICAgIH1cbiAgfSB3aGlsZSAoKGN1cl9tYXRjaCA9IHByZXZbY3VyX21hdGNoICYgd21hc2tdKSA+IGxpbWl0ICYmIC0tY2hhaW5fbGVuZ3RoICE9PSAwKTtcblxuICBpZiAoYmVzdF9sZW4gPD0gcy5sb29rYWhlYWQpIHtcbiAgICByZXR1cm4gYmVzdF9sZW47XG4gIH1cbiAgcmV0dXJuIHMubG9va2FoZWFkO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmlsbCB0aGUgd2luZG93IHdoZW4gdGhlIGxvb2thaGVhZCBiZWNvbWVzIGluc3VmZmljaWVudC5cbiAqIFVwZGF0ZXMgc3Ryc3RhcnQgYW5kIGxvb2thaGVhZC5cbiAqXG4gKiBJTiBhc3NlcnRpb246IGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQURcbiAqIE9VVCBhc3NlcnRpb25zOiBzdHJzdGFydCA8PSB3aW5kb3dfc2l6ZS1NSU5fTE9PS0FIRUFEXG4gKiAgICBBdCBsZWFzdCBvbmUgYnl0ZSBoYXMgYmVlbiByZWFkLCBvciBhdmFpbF9pbiA9PSAwOyByZWFkcyBhcmVcbiAqICAgIHBlcmZvcm1lZCBmb3IgYXQgbGVhc3QgdHdvIGJ5dGVzIChyZXF1aXJlZCBmb3IgdGhlIHppcCB0cmFuc2xhdGVfZW9sXG4gKiAgICBvcHRpb24gLS0gbm90IHN1cHBvcnRlZCBoZXJlKS5cbiAqL1xuZnVuY3Rpb24gZmlsbF93aW5kb3cocykge1xuICB2YXIgX3dfc2l6ZSA9IHMud19zaXplO1xuICB2YXIgcCwgbiwgbSwgbW9yZSwgc3RyO1xuXG4gIC8vQXNzZXJ0KHMtPmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQsIFwiYWxyZWFkeSBlbm91Z2ggbG9va2FoZWFkXCIpO1xuXG4gIGRvIHtcbiAgICBtb3JlID0gcy53aW5kb3dfc2l6ZSAtIHMubG9va2FoZWFkIC0gcy5zdHJzdGFydDtcblxuICAgIC8vIEpTIGludHMgaGF2ZSAzMiBiaXQsIGJsb2NrIGJlbG93IG5vdCBuZWVkZWRcbiAgICAvKiBEZWFsIHdpdGggIUAjJCUgNjRLIGxpbWl0OiAqL1xuICAgIC8vaWYgKHNpemVvZihpbnQpIDw9IDIpIHtcbiAgICAvLyAgICBpZiAobW9yZSA9PSAwICYmIHMtPnN0cnN0YXJ0ID09IDAgJiYgcy0+bG9va2FoZWFkID09IDApIHtcbiAgICAvLyAgICAgICAgbW9yZSA9IHdzaXplO1xuICAgIC8vXG4gICAgLy8gIH0gZWxzZSBpZiAobW9yZSA9PSAodW5zaWduZWQpKC0xKSkge1xuICAgIC8vICAgICAgICAvKiBWZXJ5IHVubGlrZWx5LCBidXQgcG9zc2libGUgb24gMTYgYml0IG1hY2hpbmUgaWZcbiAgICAvLyAgICAgICAgICogc3Ryc3RhcnQgPT0gMCAmJiBsb29rYWhlYWQgPT0gMSAoaW5wdXQgZG9uZSBhIGJ5dGUgYXQgdGltZSlcbiAgICAvLyAgICAgICAgICovXG4gICAgLy8gICAgICAgIG1vcmUtLTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cblxuICAgIC8qIElmIHRoZSB3aW5kb3cgaXMgYWxtb3N0IGZ1bGwgYW5kIHRoZXJlIGlzIGluc3VmZmljaWVudCBsb29rYWhlYWQsXG4gICAgICogbW92ZSB0aGUgdXBwZXIgaGFsZiB0byB0aGUgbG93ZXIgb25lIHRvIG1ha2Ugcm9vbSBpbiB0aGUgdXBwZXIgaGFsZi5cbiAgICAgKi9cbiAgICBpZiAocy5zdHJzdGFydCA+PSBfd19zaXplICsgKF93X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuXG4gICAgICB1dGlscy5hcnJheVNldChzLndpbmRvdywgcy53aW5kb3csIF93X3NpemUsIF93X3NpemUsIDApO1xuICAgICAgcy5tYXRjaF9zdGFydCAtPSBfd19zaXplO1xuICAgICAgcy5zdHJzdGFydCAtPSBfd19zaXplO1xuICAgICAgLyogd2Ugbm93IGhhdmUgc3Ryc3RhcnQgPj0gTUFYX0RJU1QgKi9cbiAgICAgIHMuYmxvY2tfc3RhcnQgLT0gX3dfc2l6ZTtcblxuICAgICAgLyogU2xpZGUgdGhlIGhhc2ggdGFibGUgKGNvdWxkIGJlIGF2b2lkZWQgd2l0aCAzMiBiaXQgdmFsdWVzXG4gICAgICAgYXQgdGhlIGV4cGVuc2Ugb2YgbWVtb3J5IHVzYWdlKS4gV2Ugc2xpZGUgZXZlbiB3aGVuIGxldmVsID09IDBcbiAgICAgICB0byBrZWVwIHRoZSBoYXNoIHRhYmxlIGNvbnNpc3RlbnQgaWYgd2Ugc3dpdGNoIGJhY2sgdG8gbGV2ZWwgPiAwXG4gICAgICAgbGF0ZXIuIChVc2luZyBsZXZlbCAwIHBlcm1hbmVudGx5IGlzIG5vdCBhbiBvcHRpbWFsIHVzYWdlIG9mXG4gICAgICAgemxpYiwgc28gd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGlzIHBhdGhvbG9naWNhbCBjYXNlLilcbiAgICAgICAqL1xuXG4gICAgICBuID0gcy5oYXNoX3NpemU7XG4gICAgICBwID0gbjtcbiAgICAgIGRvIHtcbiAgICAgICAgbSA9IHMuaGVhZFstLXBdO1xuICAgICAgICBzLmhlYWRbcF0gPSAobSA+PSBfd19zaXplID8gbSAtIF93X3NpemUgOiAwKTtcbiAgICAgIH0gd2hpbGUgKC0tbik7XG5cbiAgICAgIG4gPSBfd19zaXplO1xuICAgICAgcCA9IG47XG4gICAgICBkbyB7XG4gICAgICAgIG0gPSBzLnByZXZbLS1wXTtcbiAgICAgICAgcy5wcmV2W3BdID0gKG0gPj0gX3dfc2l6ZSA/IG0gLSBfd19zaXplIDogMCk7XG4gICAgICAgIC8qIElmIG4gaXMgbm90IG9uIGFueSBoYXNoIGNoYWluLCBwcmV2W25dIGlzIGdhcmJhZ2UgYnV0XG4gICAgICAgICAqIGl0cyB2YWx1ZSB3aWxsIG5ldmVyIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgfSB3aGlsZSAoLS1uKTtcblxuICAgICAgbW9yZSArPSBfd19zaXplO1xuICAgIH1cbiAgICBpZiAocy5zdHJtLmF2YWlsX2luID09PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvKiBJZiB0aGVyZSB3YXMgbm8gc2xpZGluZzpcbiAgICAgKiAgICBzdHJzdGFydCA8PSBXU0laRStNQVhfRElTVC0xICYmIGxvb2thaGVhZCA8PSBNSU5fTE9PS0FIRUFEIC0gMSAmJlxuICAgICAqICAgIG1vcmUgPT0gd2luZG93X3NpemUgLSBsb29rYWhlYWQgLSBzdHJzdGFydFxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAoTUlOX0xPT0tBSEVBRC0xICsgV1NJWkUgKyBNQVhfRElTVC0xKVxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAyKldTSVpFICsgMlxuICAgICAqIEluIHRoZSBCSUdfTUVNIG9yIE1NQVAgY2FzZSAobm90IHlldCBzdXBwb3J0ZWQpLFxuICAgICAqICAgd2luZG93X3NpemUgPT0gaW5wdXRfc2l6ZSArIE1JTl9MT09LQUhFQUQgICYmXG4gICAgICogICBzdHJzdGFydCArIHMtPmxvb2thaGVhZCA8PSBpbnB1dF9zaXplID0+IG1vcmUgPj0gTUlOX0xPT0tBSEVBRC5cbiAgICAgKiBPdGhlcndpc2UsIHdpbmRvd19zaXplID09IDIqV1NJWkUgc28gbW9yZSA+PSAyLlxuICAgICAqIElmIHRoZXJlIHdhcyBzbGlkaW5nLCBtb3JlID49IFdTSVpFLiBTbyBpbiBhbGwgY2FzZXMsIG1vcmUgPj0gMi5cbiAgICAgKi9cbiAgICAvL0Fzc2VydChtb3JlID49IDIsIFwibW9yZSA8IDJcIik7XG4gICAgbiA9IHJlYWRfYnVmKHMuc3RybSwgcy53aW5kb3csIHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZCwgbW9yZSk7XG4gICAgcy5sb29rYWhlYWQgKz0gbjtcblxuICAgIC8qIEluaXRpYWxpemUgdGhlIGhhc2ggdmFsdWUgbm93IHRoYXQgd2UgaGF2ZSBzb21lIGlucHV0OiAqL1xuICAgIGlmIChzLmxvb2thaGVhZCArIHMuaW5zZXJ0ID49IE1JTl9NQVRDSCkge1xuICAgICAgc3RyID0gcy5zdHJzdGFydCAtIHMuaW5zZXJ0O1xuICAgICAgcy5pbnNfaCA9IHMud2luZG93W3N0cl07XG5cbiAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgMV0pOyAqL1xuICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgMV0pICYgcy5oYXNoX21hc2s7XG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgIENhbGwgdXBkYXRlX2hhc2goKSBNSU5fTUFUQ0gtMyBtb3JlIHRpbWVzXG4vLyNlbmRpZlxuICAgICAgd2hpbGUgKHMuaW5zZXJ0KSB7XG4gICAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgTUlOX01BVENILTFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG5cbiAgICAgICAgcy5wcmV2W3N0ciAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gc3RyO1xuICAgICAgICBzdHIrKztcbiAgICAgICAgcy5pbnNlcnQtLTtcbiAgICAgICAgaWYgKHMubG9va2FoZWFkICsgcy5pbnNlcnQgPCBNSU5fTUFUQ0gpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGUgd2hvbGUgaW5wdXQgaGFzIGxlc3MgdGhhbiBNSU5fTUFUQ0ggYnl0ZXMsIGluc19oIGlzIGdhcmJhZ2UsXG4gICAgICogYnV0IHRoaXMgaXMgbm90IGltcG9ydGFudCBzaW5jZSBvbmx5IGxpdGVyYWwgYnl0ZXMgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqL1xuXG4gIH0gd2hpbGUgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBzLnN0cm0uYXZhaWxfaW4gIT09IDApO1xuXG4gIC8qIElmIHRoZSBXSU5fSU5JVCBieXRlcyBhZnRlciB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGRhdGEgaGF2ZSBuZXZlciBiZWVuXG4gICAqIHdyaXR0ZW4sIHRoZW4gemVybyB0aG9zZSBieXRlcyBpbiBvcmRlciB0byBhdm9pZCBtZW1vcnkgY2hlY2sgcmVwb3J0cyBvZlxuICAgKiB0aGUgdXNlIG9mIHVuaW5pdGlhbGl6ZWQgKG9yIHVuaW5pdGlhbGlzZWQgYXMgSnVsaWFuIHdyaXRlcykgYnl0ZXMgYnlcbiAgICogdGhlIGxvbmdlc3QgbWF0Y2ggcm91dGluZXMuICBVcGRhdGUgdGhlIGhpZ2ggd2F0ZXIgbWFyayBmb3IgdGhlIG5leHRcbiAgICogdGltZSB0aHJvdWdoIGhlcmUuICBXSU5fSU5JVCBpcyBzZXQgdG8gTUFYX01BVENIIHNpbmNlIHRoZSBsb25nZXN0IG1hdGNoXG4gICAqIHJvdXRpbmVzIGFsbG93IHNjYW5uaW5nIHRvIHN0cnN0YXJ0ICsgTUFYX01BVENILCBpZ25vcmluZyBsb29rYWhlYWQuXG4gICAqL1xuLy8gIGlmIChzLmhpZ2hfd2F0ZXIgPCBzLndpbmRvd19zaXplKSB7XG4vLyAgICB2YXIgY3VyciA9IHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZDtcbi8vICAgIHZhciBpbml0ID0gMDtcbi8vXG4vLyAgICBpZiAocy5oaWdoX3dhdGVyIDwgY3Vycikge1xuLy8gICAgICAvKiBQcmV2aW91cyBoaWdoIHdhdGVyIG1hcmsgYmVsb3cgY3VycmVudCBkYXRhIC0tIHplcm8gV0lOX0lOSVRcbi8vICAgICAgICogYnl0ZXMgb3IgdXAgdG8gZW5kIG9mIHdpbmRvdywgd2hpY2hldmVyIGlzIGxlc3MuXG4vLyAgICAgICAqL1xuLy8gICAgICBpbml0ID0gcy53aW5kb3dfc2l6ZSAtIGN1cnI7XG4vLyAgICAgIGlmIChpbml0ID4gV0lOX0lOSVQpXG4vLyAgICAgICAgaW5pdCA9IFdJTl9JTklUO1xuLy8gICAgICB6bWVtemVybyhzLT53aW5kb3cgKyBjdXJyLCAodW5zaWduZWQpaW5pdCk7XG4vLyAgICAgIHMtPmhpZ2hfd2F0ZXIgPSBjdXJyICsgaW5pdDtcbi8vICAgIH1cbi8vICAgIGVsc2UgaWYgKHMtPmhpZ2hfd2F0ZXIgPCAodWxnKWN1cnIgKyBXSU5fSU5JVCkge1xuLy8gICAgICAvKiBIaWdoIHdhdGVyIG1hcmsgYXQgb3IgYWJvdmUgY3VycmVudCBkYXRhLCBidXQgYmVsb3cgY3VycmVudCBkYXRhXG4vLyAgICAgICAqIHBsdXMgV0lOX0lOSVQgLS0gemVybyBvdXQgdG8gY3VycmVudCBkYXRhIHBsdXMgV0lOX0lOSVQsIG9yIHVwXG4vLyAgICAgICAqIHRvIGVuZCBvZiB3aW5kb3csIHdoaWNoZXZlciBpcyBsZXNzLlxuLy8gICAgICAgKi9cbi8vICAgICAgaW5pdCA9ICh1bGcpY3VyciArIFdJTl9JTklUIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgaWYgKGluaXQgPiBzLT53aW5kb3dfc2l6ZSAtIHMtPmhpZ2hfd2F0ZXIpXG4vLyAgICAgICAgaW5pdCA9IHMtPndpbmRvd19zaXplIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgem1lbXplcm8ocy0+d2luZG93ICsgcy0+aGlnaF93YXRlciwgKHVuc2lnbmVkKWluaXQpO1xuLy8gICAgICBzLT5oaWdoX3dhdGVyICs9IGluaXQ7XG4vLyAgICB9XG4vLyAgfVxuLy9cbi8vICBBc3NlcnQoKHVsZylzLT5zdHJzdGFydCA8PSBzLT53aW5kb3dfc2l6ZSAtIE1JTl9MT09LQUhFQUQsXG4vLyAgICBcIm5vdCBlbm91Z2ggcm9vbSBmb3Igc2VhcmNoXCIpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHkgd2l0aG91dCBjb21wcmVzc2lvbiBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuXG4gKiB0aGUgY3VycmVudCBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgaW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBkaWN0aW9uYXJ5IHNpbmNlXG4gKiB1bmNvbXByZXNzaWJsZSBkYXRhIGlzIHByb2JhYmx5IG5vdCB1c2VmdWwuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZFxuICogb25seSBmb3IgdGhlIGxldmVsPTAgY29tcHJlc3Npb24gb3B0aW9uLlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgb3B0aW1pemVkIHRvIGF2b2lkIGV4dHJhIGNvcHlpbmcgZnJvbVxuICogd2luZG93IHRvIHBlbmRpbmdfYnVmLlxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3N0b3JlZChzLCBmbHVzaCkge1xuICAvKiBTdG9yZWQgYmxvY2tzIGFyZSBsaW1pdGVkIHRvIDB4ZmZmZiBieXRlcywgcGVuZGluZ19idWYgaXMgbGltaXRlZFxuICAgKiB0byBwZW5kaW5nX2J1Zl9zaXplLCBhbmQgZWFjaCBzdG9yZWQgYmxvY2sgaGFzIGEgNSBieXRlIGhlYWRlcjpcbiAgICovXG4gIHZhciBtYXhfYmxvY2tfc2l6ZSA9IDB4ZmZmZjtcblxuICBpZiAobWF4X2Jsb2NrX3NpemUgPiBzLnBlbmRpbmdfYnVmX3NpemUgLSA1KSB7XG4gICAgbWF4X2Jsb2NrX3NpemUgPSBzLnBlbmRpbmdfYnVmX3NpemUgLSA1O1xuICB9XG5cbiAgLyogQ29weSBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gaW5wdXQgdG8gb3V0cHV0OiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogRmlsbCB0aGUgd2luZG93IGFzIG11Y2ggYXMgcG9zc2libGU6ICovXG4gICAgaWYgKHMubG9va2FoZWFkIDw9IDEpIHtcblxuICAgICAgLy9Bc3NlcnQocy0+c3Ryc3RhcnQgPCBzLT53X3NpemUrTUFYX0RJU1QocykgfHxcbiAgICAgIC8vICBzLT5ibG9ja19zdGFydCA+PSAobG9uZylzLT53X3NpemUsIFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIGlmICghKHMuc3Ryc3RhcnQgPCBzLndfc2l6ZSArIChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIHx8XG4vLyAgICAgICAgcy5ibG9ja19zdGFydCA+PSBzLndfc2l6ZSkpIHtcbi8vICAgICAgICB0aHJvdyAgbmV3IEVycm9yKFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIH1cblxuICAgICAgZmlsbF93aW5kb3cocyk7XG4gICAgICBpZiAocy5sb29rYWhlYWQgPT09IDAgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICB9XG4gICAgLy9Bc3NlcnQocy0+YmxvY2tfc3RhcnQgPj0gMEwsIFwiYmxvY2sgZ29uZVwiKTtcbi8vICAgIGlmIChzLmJsb2NrX3N0YXJ0IDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiYmxvY2sgZ29uZVwiKTtcblxuICAgIHMuc3Ryc3RhcnQgKz0gcy5sb29rYWhlYWQ7XG4gICAgcy5sb29rYWhlYWQgPSAwO1xuXG4gICAgLyogRW1pdCBhIHN0b3JlZCBibG9jayBpZiBwZW5kaW5nX2J1ZiB3aWxsIGJlIGZ1bGw6ICovXG4gICAgdmFyIG1heF9zdGFydCA9IHMuYmxvY2tfc3RhcnQgKyBtYXhfYmxvY2tfc2l6ZTtcblxuICAgIGlmIChzLnN0cnN0YXJ0ID09PSAwIHx8IHMuc3Ryc3RhcnQgPj0gbWF4X3N0YXJ0KSB7XG4gICAgICAvKiBzdHJzdGFydCA9PSAwIGlzIHBvc3NpYmxlIHdoZW4gd3JhcGFyb3VuZCBvbiAxNi1iaXQgbWFjaGluZSAqL1xuICAgICAgcy5sb29rYWhlYWQgPSBzLnN0cnN0YXJ0IC0gbWF4X3N0YXJ0O1xuICAgICAgcy5zdHJzdGFydCA9IG1heF9zdGFydDtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG5cblxuICAgIH1cbiAgICAvKiBGbHVzaCBpZiB3ZSBtYXkgaGF2ZSB0byBzbGlkZSwgb3RoZXJ3aXNlIGJsb2NrX3N0YXJ0IG1heSBiZWNvbWVcbiAgICAgKiBuZWdhdGl2ZSBhbmQgdGhlIGRhdGEgd2lsbCBiZSBnb25lOlxuICAgICAqL1xuICAgIGlmIChzLnN0cnN0YXJ0IC0gcy5ibG9ja19zdGFydCA+PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cblxuICBzLmluc2VydCA9IDA7XG5cbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG5cbiAgaWYgKHMuc3Ryc3RhcnQgPiBzLmJsb2NrX3N0YXJ0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX05FRURfTU9SRTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb21wcmVzcyBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuIHRoZSBjdXJyZW50XG4gKiBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcGVyZm9ybSBsYXp5IGV2YWx1YXRpb24gb2YgbWF0Y2hlcyBhbmQgaW5zZXJ0c1xuICogbmV3IHN0cmluZ3MgaW4gdGhlIGRpY3Rpb25hcnkgb25seSBmb3IgdW5tYXRjaGVkIHN0cmluZ3Mgb3IgZm9yIHNob3J0XG4gKiBtYXRjaGVzLiBJdCBpcyB1c2VkIG9ubHkgZm9yIHRoZSBmYXN0IGNvbXByZXNzaW9uIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfZmFzdChzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgLyogaGVhZCBvZiB0aGUgaGFzaCBjaGFpbiAqL1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgLyogc2V0IGlmIGN1cnJlbnQgYmxvY2sgbXVzdCBiZSBmbHVzaGVkICovXG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBuZXh0IG1hdGNoLCBwbHVzIE1JTl9NQVRDSCBieXRlcyB0byBpbnNlcnQgdGhlXG4gICAgICogc3RyaW5nIGZvbGxvd2luZyB0aGUgbmV4dCBtYXRjaC5cbiAgICAgKi9cbiAgICBpZiAocy5sb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBicmVhazsgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBJbnNlcnQgdGhlIHN0cmluZyB3aW5kb3dbc3Ryc3RhcnQgLi4gc3Ryc3RhcnQrMl0gaW4gdGhlXG4gICAgICogZGljdGlvbmFyeSwgYW5kIHNldCBoYXNoX2hlYWQgdG8gdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW46XG4gICAgICovXG4gICAgaGFzaF9oZWFkID0gMC8qTklMKi87XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgIHMuaW5zX2ggPSAoKHMuaW5zX2ggPDwgcy5oYXNoX3NoaWZ0KSBeIHMud2luZG93W3Muc3Ryc3RhcnQgKyBNSU5fTUFUQ0ggLSAxXSkgJiBzLmhhc2hfbWFzaztcbiAgICAgIGhhc2hfaGVhZCA9IHMucHJldltzLnN0cnN0YXJ0ICYgcy53X21hc2tdID0gcy5oZWFkW3MuaW5zX2hdO1xuICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgIC8qKiovXG4gICAgfVxuXG4gICAgLyogRmluZCB0aGUgbG9uZ2VzdCBtYXRjaCwgZGlzY2FyZGluZyB0aG9zZSA8PSBwcmV2X2xlbmd0aC5cbiAgICAgKiBBdCB0aGlzIHBvaW50IHdlIGhhdmUgYWx3YXlzIG1hdGNoX2xlbmd0aCA8IE1JTl9NQVRDSFxuICAgICAqL1xuICAgIGlmIChoYXNoX2hlYWQgIT09IDAvKk5JTCovICYmICgocy5zdHJzdGFydCAtIGhhc2hfaGVhZCkgPD0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkpKSB7XG4gICAgICAvKiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZ1xuICAgICAgICogb2Ygd2luZG93IGluZGV4IDAgKGluIHBhcnRpY3VsYXIgd2UgaGF2ZSB0byBhdm9pZCBhIG1hdGNoXG4gICAgICAgKiBvZiB0aGUgc3RyaW5nIHdpdGggaXRzZWxmIGF0IHRoZSBzdGFydCBvZiB0aGUgaW5wdXQgZmlsZSkuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gbG9uZ2VzdF9tYXRjaChzLCBoYXNoX2hlYWQpO1xuICAgICAgLyogbG9uZ2VzdF9tYXRjaCgpIHNldHMgbWF0Y2hfc3RhcnQgKi9cbiAgICB9XG4gICAgaWYgKHMubWF0Y2hfbGVuZ3RoID49IE1JTl9NQVRDSCkge1xuICAgICAgLy8gY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydCwgcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGgpOyAvLyBmb3IgZGVidWcgb25seVxuXG4gICAgICAvKioqIF90cl90YWxseV9kaXN0KHMsIHMuc3Ryc3RhcnQgLSBzLm1hdGNoX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gpO1xuXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLm1hdGNoX2xlbmd0aDtcblxuICAgICAgLyogSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aFxuICAgICAgICogaXMgbm90IHRvbyBsYXJnZS4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICAgICAqL1xuICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoIDw9IHMubWF4X2xhenlfbWF0Y2gvKm1heF9pbnNlcnRfbGVuZ3RoKi8gJiYgcy5sb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoLS07IC8qIHN0cmluZyBhdCBzdHJzdGFydCBhbHJlYWR5IGluIHRhYmxlICovXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICAgIC8qIHN0cnN0YXJ0IG5ldmVyIGV4Y2VlZHMgV1NJWkUtTUFYX01BVENILCBzbyB0aGVyZSBhcmVcbiAgICAgICAgICAgKiBhbHdheXMgTUlOX01BVENIIGJ5dGVzIGFoZWFkLlxuICAgICAgICAgICAqL1xuICAgICAgICB9IHdoaWxlICgtLXMubWF0Y2hfbGVuZ3RoICE9PSAwKTtcbiAgICAgICAgcy5zdHJzdGFydCsrO1xuICAgICAgfSBlbHNlXG4gICAgICB7XG4gICAgICAgIHMuc3Ryc3RhcnQgKz0gcy5tYXRjaF9sZW5ndGg7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICAgICAgcy5pbnNfaCA9IHMud2luZG93W3Muc3Ryc3RhcnRdO1xuICAgICAgICAvKiBVUERBVEVfSEFTSChzLCBzLmluc19oLCBzLndpbmRvd1tzLnN0cnN0YXJ0KzFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbcy5zdHJzdGFydCArIDFdKSAmIHMuaGFzaF9tYXNrO1xuXG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgICAgICAgICAgQ2FsbCBVUERBVEVfSEFTSCgpIE1JTl9NQVRDSC0zIG1vcmUgdGltZXNcbi8vI2VuZGlmXG4gICAgICAgIC8qIElmIGxvb2thaGVhZCA8IE1JTl9NQVRDSCwgaW5zX2ggaXMgZ2FyYmFnZSwgYnV0IGl0IGRvZXMgbm90XG4gICAgICAgICAqIG1hdHRlciBzaW5jZSBpdCB3aWxsIGJlIHJlY29tcHV0ZWQgYXQgbmV4dCBkZWZsYXRlIGNhbGwuXG4gICAgICAgICAqL1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiBObyBtYXRjaCwgb3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgICAvL1RyYWNldnYoKHN0ZGVycixcIiVjXCIsIHMud2luZG93W3Muc3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gKChzLnN0cnN0YXJ0IDwgKE1JTl9NQVRDSCAtIDEpKSA/IHMuc3Ryc3RhcnQgOiBNSU5fTUFUQ0ggLSAxKTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNhbWUgYXMgYWJvdmUsIGJ1dCBhY2hpZXZlcyBiZXR0ZXIgY29tcHJlc3Npb24uIFdlIHVzZSBhIGxhenlcbiAqIGV2YWx1YXRpb24gZm9yIG1hdGNoZXM6IGEgbWF0Y2ggaXMgZmluYWxseSBhZG9wdGVkIG9ubHkgaWYgdGhlcmUgaXNcbiAqIG5vIGJldHRlciBtYXRjaCBhdCB0aGUgbmV4dCB3aW5kb3cgcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfc2xvdyhzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgICAvKiBoZWFkIG9mIGhhc2ggY2hhaW4gKi9cbiAgdmFyIGJmbHVzaDsgICAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuXG4gIHZhciBtYXhfaW5zZXJ0O1xuXG4gIC8qIFByb2Nlc3MgdGhlIGlucHV0IGJsb2NrLiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgYWx3YXlzIGhhdmUgZW5vdWdoIGxvb2thaGVhZCwgZXhjZXB0XG4gICAgICogYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgZmlsZS4gV2UgbmVlZCBNQVhfTUFUQ0ggYnl0ZXNcbiAgICAgKiBmb3IgdGhlIG5leHQgbWF0Y2gsIHBsdXMgTUlOX01BVENIIGJ5dGVzIHRvIGluc2VydCB0aGVcbiAgICAgKiBzdHJpbmcgZm9sbG93aW5nIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogSW5zZXJ0IHRoZSBzdHJpbmcgd2luZG93W3N0cnN0YXJ0IC4uIHN0cnN0YXJ0KzJdIGluIHRoZVxuICAgICAqIGRpY3Rpb25hcnksIGFuZCBzZXQgaGFzaF9oZWFkIHRvIHRoZSBoZWFkIG9mIHRoZSBoYXNoIGNoYWluOlxuICAgICAqL1xuICAgIGhhc2hfaGVhZCA9IDAvKk5JTCovO1xuICAgIGlmIChzLmxvb2thaGVhZCA+PSBNSU5fTUFUQ0gpIHtcbiAgICAgIC8qKiogSU5TRVJUX1NUUklORyhzLCBzLnN0cnN0YXJ0LCBoYXNoX2hlYWQpOyAqKiovXG4gICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICBoYXNoX2hlYWQgPSBzLnByZXZbcy5zdHJzdGFydCAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgIHMuaGVhZFtzLmluc19oXSA9IHMuc3Ryc3RhcnQ7XG4gICAgICAvKioqL1xuICAgIH1cblxuICAgIC8qIEZpbmQgdGhlIGxvbmdlc3QgbWF0Y2gsIGRpc2NhcmRpbmcgdGhvc2UgPD0gcHJldl9sZW5ndGguXG4gICAgICovXG4gICAgcy5wcmV2X2xlbmd0aCA9IHMubWF0Y2hfbGVuZ3RoO1xuICAgIHMucHJldl9tYXRjaCA9IHMubWF0Y2hfc3RhcnQ7XG4gICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuXG4gICAgaWYgKGhhc2hfaGVhZCAhPT0gMC8qTklMKi8gJiYgcy5wcmV2X2xlbmd0aCA8IHMubWF4X2xhenlfbWF0Y2ggJiZcbiAgICAgICAgcy5zdHJzdGFydCAtIGhhc2hfaGVhZCA8PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKS8qTUFYX0RJU1QocykqLykge1xuICAgICAgLyogVG8gc2ltcGxpZnkgdGhlIGNvZGUsIHdlIHByZXZlbnQgbWF0Y2hlcyB3aXRoIHRoZSBzdHJpbmdcbiAgICAgICAqIG9mIHdpbmRvdyBpbmRleCAwIChpbiBwYXJ0aWN1bGFyIHdlIGhhdmUgdG8gYXZvaWQgYSBtYXRjaFxuICAgICAgICogb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxuICAgICAgICovXG4gICAgICBzLm1hdGNoX2xlbmd0aCA9IGxvbmdlc3RfbWF0Y2gocywgaGFzaF9oZWFkKTtcbiAgICAgIC8qIGxvbmdlc3RfbWF0Y2goKSBzZXRzIG1hdGNoX3N0YXJ0ICovXG5cbiAgICAgIGlmIChzLm1hdGNoX2xlbmd0aCA8PSA1ICYmXG4gICAgICAgICAocy5zdHJhdGVneSA9PT0gWl9GSUxURVJFRCB8fCAocy5tYXRjaF9sZW5ndGggPT09IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCA+IDQwOTYvKlRPT19GQVIqLykpKSB7XG5cbiAgICAgICAgLyogSWYgcHJldl9tYXRjaCBpcyBhbHNvIE1JTl9NQVRDSCwgbWF0Y2hfc3RhcnQgaXMgZ2FyYmFnZVxuICAgICAgICAgKiBidXQgd2Ugd2lsbCBpZ25vcmUgdGhlIGN1cnJlbnQgbWF0Y2ggYW55d2F5LlxuICAgICAgICAgKi9cbiAgICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBhdCB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhlIGN1cnJlbnRcbiAgICAgKiBtYXRjaCBpcyBub3QgYmV0dGVyLCBvdXRwdXQgdGhlIHByZXZpb3VzIG1hdGNoOlxuICAgICAqL1xuICAgIGlmIChzLnByZXZfbGVuZ3RoID49IE1JTl9NQVRDSCAmJiBzLm1hdGNoX2xlbmd0aCA8PSBzLnByZXZfbGVuZ3RoKSB7XG4gICAgICBtYXhfaW5zZXJ0ID0gcy5zdHJzdGFydCArIHMubG9va2FoZWFkIC0gTUlOX01BVENIO1xuICAgICAgLyogRG8gbm90IGluc2VydCBzdHJpbmdzIGluIGhhc2ggdGFibGUgYmV5b25kIHRoaXMuICovXG5cbiAgICAgIC8vY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydC0xLCBzLnByZXZfbWF0Y2gsIHMucHJldl9sZW5ndGgpO1xuXG4gICAgICAvKioqX3RyX3RhbGx5X2Rpc3Qocywgcy5zdHJzdGFydCAtIDEgLSBzLnByZXZfbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICBzLnByZXZfbGVuZ3RoIC0gTUlOX01BVENILCBiZmx1c2gpOyoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gMSAtIHMucHJldl9tYXRjaCwgcy5wcmV2X2xlbmd0aCAtIE1JTl9NQVRDSCk7XG4gICAgICAvKiBJbnNlcnQgaW4gaGFzaCB0YWJsZSBhbGwgc3RyaW5ncyB1cCB0byB0aGUgZW5kIG9mIHRoZSBtYXRjaC5cbiAgICAgICAqIHN0cnN0YXJ0LTEgYW5kIHN0cnN0YXJ0IGFyZSBhbHJlYWR5IGluc2VydGVkLiBJZiB0aGVyZSBpcyBub3RcbiAgICAgICAqIGVub3VnaCBsb29rYWhlYWQsIHRoZSBsYXN0IHR3byBzdHJpbmdzIGFyZSBub3QgaW5zZXJ0ZWQgaW5cbiAgICAgICAqIHRoZSBoYXNoIHRhYmxlLlxuICAgICAgICovXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLnByZXZfbGVuZ3RoIC0gMTtcbiAgICAgIHMucHJldl9sZW5ndGggLT0gMjtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKCsrcy5zdHJzdGFydCA8PSBtYXhfaW5zZXJ0KSB7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICB9XG4gICAgICB9IHdoaWxlICgtLXMucHJldl9sZW5ndGggIT09IDApO1xuICAgICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgcy5zdHJzdGFydCsrO1xuXG4gICAgICBpZiAoYmZsdXNoKSB7XG4gICAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgICAgfVxuICAgICAgICAvKioqL1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChzLm1hdGNoX2F2YWlsYWJsZSkge1xuICAgICAgLyogSWYgdGhlcmUgd2FzIG5vIG1hdGNoIGF0IHRoZSBwcmV2aW91cyBwb3NpdGlvbiwgb3V0cHV0IGFcbiAgICAgICAqIHNpbmdsZSBsaXRlcmFsLiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBidXQgdGhlIGN1cnJlbnQgbWF0Y2hcbiAgICAgICAqIGlzIGxvbmdlciwgdHJ1bmNhdGUgdGhlIHByZXZpb3VzIG1hdGNoIHRvIGEgc2luZ2xlIGxpdGVyYWwuXG4gICAgICAgKi9cbiAgICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0LTFdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgICAgYmZsdXNoID0gdHJlZXMuX3RyX3RhbGx5KHMsIDAsIHMud2luZG93W3Muc3Ryc3RhcnQgLSAxXSk7XG5cbiAgICAgIGlmIChiZmx1c2gpIHtcbiAgICAgICAgLyoqKiBGTFVTSF9CTE9DS19PTkxZKHMsIDApICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIC8qKiovXG4gICAgICB9XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICBzLmxvb2thaGVhZC0tO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyogVGhlcmUgaXMgbm8gcHJldmlvdXMgbWF0Y2ggdG8gY29tcGFyZSB3aXRoLCB3YWl0IGZvclxuICAgICAgICogdGhlIG5leHQgc3RlcCB0byBkZWNpZGUuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfYXZhaWxhYmxlID0gMTtcbiAgICAgIHMuc3Ryc3RhcnQrKztcbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChmbHVzaCAhPSBaX05PX0ZMVVNILCBcIm5vIGZsdXNoP1wiKTtcbiAgaWYgKHMubWF0Y2hfYXZhaWxhYmxlKSB7XG4gICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnQtMV0pKTtcbiAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0IC0gMV0pO1xuXG4gICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICB9XG4gIHMuaW5zZXJ0ID0gcy5zdHJzdGFydCA8IE1JTl9NQVRDSCAtIDEgPyBzLnN0cnN0YXJ0IDogTUlOX01BVENIIC0gMTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGb3IgWl9STEUsIHNpbXBseSBsb29rIGZvciBydW5zIG9mIGJ5dGVzLCBnZW5lcmF0ZSBtYXRjaGVzIG9ubHkgb2YgZGlzdGFuY2VcbiAqIG9uZS4gIERvIG5vdCBtYWludGFpbiBhIGhhc2ggdGFibGUuICAoSXQgd2lsbCBiZSByZWdlbmVyYXRlZCBpZiB0aGlzIHJ1biBvZlxuICogZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gWl9STEUuKVxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3JsZShzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuICB2YXIgcHJldjsgICAgICAgICAgICAgIC8qIGJ5dGUgYXQgZGlzdGFuY2Ugb25lIHRvIG1hdGNoICovXG4gIHZhciBzY2FuLCBzdHJlbmQ7ICAgICAgLyogc2NhbiBnb2VzIHVwIHRvIHN0cmVuZCBmb3IgbGVuZ3RoIG9mIHJ1biAqL1xuXG4gIHZhciBfd2luID0gcy53aW5kb3c7XG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBsb25nZXN0IHJ1biwgcGx1cyBvbmUgZm9yIHRoZSB1bnJvbGxlZCBsb29wLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8PSBNQVhfTUFUQ0gpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDw9IE1BWF9NQVRDSCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogU2VlIGhvdyBtYW55IHRpbWVzIHRoZSBwcmV2aW91cyBieXRlIHJlcGVhdHMgKi9cbiAgICBzLm1hdGNoX2xlbmd0aCA9IDA7XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0ID4gMCkge1xuICAgICAgc2NhbiA9IHMuc3Ryc3RhcnQgLSAxO1xuICAgICAgcHJldiA9IF93aW5bc2Nhbl07XG4gICAgICBpZiAocHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0pIHtcbiAgICAgICAgc3RyZW5kID0gcy5zdHJzdGFydCArIE1BWF9NQVRDSDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIC8qanNoaW50IG5vZW1wdHk6ZmFsc2UqL1xuICAgICAgICB9IHdoaWxlIChwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiZcbiAgICAgICAgICAgICAgICAgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJlxuICAgICAgICAgICAgICAgICBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHNjYW4gPCBzdHJlbmQpO1xuICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IE1BWF9NQVRDSCAtIChzdHJlbmQgLSBzY2FuKTtcbiAgICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoID4gcy5sb29rYWhlYWQpIHtcbiAgICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IHMubG9va2FoZWFkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL0Fzc2VydChzY2FuIDw9IHMtPndpbmRvdysodUludCkocy0+d2luZG93X3NpemUtMSksIFwid2lsZCBzY2FuXCIpO1xuICAgIH1cblxuICAgIC8qIEVtaXQgbWF0Y2ggaWYgaGF2ZSBydW4gb2YgTUlOX01BVENIIG9yIGxvbmdlciwgZWxzZSBlbWl0IGxpdGVyYWwgKi9cbiAgICBpZiAocy5tYXRjaF9sZW5ndGggPj0gTUlOX01BVENIKSB7XG4gICAgICAvL2NoZWNrX21hdGNoKHMsIHMuc3Ryc3RhcnQsIHMuc3Ryc3RhcnQgLSAxLCBzLm1hdGNoX2xlbmd0aCk7XG5cbiAgICAgIC8qKiogX3RyX3RhbGx5X2Rpc3QocywgMSwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAxLCBzLm1hdGNoX2xlbmd0aCAtIE1JTl9NQVRDSCk7XG5cbiAgICAgIHMubG9va2FoZWFkIC09IHMubWF0Y2hfbGVuZ3RoO1xuICAgICAgcy5zdHJzdGFydCArPSBzLm1hdGNoX2xlbmd0aDtcbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLyogTm8gbWF0Y2gsIG91dHB1dCBhIGxpdGVyYWwgYnl0ZSAqL1xuICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gMDtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZvciBaX0hVRkZNQU5fT05MWSwgZG8gbm90IGxvb2sgZm9yIG1hdGNoZXMuICBEbyBub3QgbWFpbnRhaW4gYSBoYXNoIHRhYmxlLlxuICogKEl0IHdpbGwgYmUgcmVnZW5lcmF0ZWQgaWYgdGhpcyBydW4gb2YgZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gSHVmZm1hbi4pXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfaHVmZihzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgICAvKiBzZXQgaWYgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWQgKi9cblxuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgaGF2ZSBhIGxpdGVyYWwgdG8gd3JpdGUuICovXG4gICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrOyAgICAgIC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogT3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgcy5tYXRjaF9sZW5ndGggPSAwO1xuICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0XSkpO1xuICAgIC8qKiogX3RyX3RhbGx5X2xpdChzLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG4gICAgcy5sb29rYWhlYWQtLTtcbiAgICBzLnN0cnN0YXJ0Kys7XG4gICAgaWYgKGJmbHVzaCkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cbiAgcy5pbnNlcnQgPSAwO1xuICBpZiAoZmx1c2ggPT09IFpfRklOSVNIKSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAxKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgdHJ1ZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19GSU5JU0hfU1RBUlRFRDtcbiAgICB9XG4gICAgLyoqKi9cbiAgICByZXR1cm4gQlNfRklOSVNIX0RPTkU7XG4gIH1cbiAgaWYgKHMubGFzdF9saXQpIHtcbiAgICAvKioqIEZMVVNIX0JMT0NLKHMsIDApOyAqKiovXG4gICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19ORUVEX01PUkU7XG4gICAgfVxuICAgIC8qKiovXG4gIH1cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cbi8qIFZhbHVlcyBmb3IgbWF4X2xhenlfbWF0Y2gsIGdvb2RfbWF0Y2ggYW5kIG1heF9jaGFpbl9sZW5ndGgsIGRlcGVuZGluZyBvblxuICogdGhlIGRlc2lyZWQgcGFjayBsZXZlbCAoMC4uOSkuIFRoZSB2YWx1ZXMgZ2l2ZW4gYmVsb3cgaGF2ZSBiZWVuIHR1bmVkIHRvXG4gKiBleGNsdWRlIHdvcnN0IGNhc2UgcGVyZm9ybWFuY2UgZm9yIHBhdGhvbG9naWNhbCBmaWxlcy4gQmV0dGVyIHZhbHVlcyBtYXkgYmVcbiAqIGZvdW5kIGZvciBzcGVjaWZpYyBmaWxlcy5cbiAqL1xuZnVuY3Rpb24gQ29uZmlnKGdvb2RfbGVuZ3RoLCBtYXhfbGF6eSwgbmljZV9sZW5ndGgsIG1heF9jaGFpbiwgZnVuYykge1xuICB0aGlzLmdvb2RfbGVuZ3RoID0gZ29vZF9sZW5ndGg7XG4gIHRoaXMubWF4X2xhenkgPSBtYXhfbGF6eTtcbiAgdGhpcy5uaWNlX2xlbmd0aCA9IG5pY2VfbGVuZ3RoO1xuICB0aGlzLm1heF9jaGFpbiA9IG1heF9jaGFpbjtcbiAgdGhpcy5mdW5jID0gZnVuYztcbn1cblxudmFyIGNvbmZpZ3VyYXRpb25fdGFibGU7XG5cbmNvbmZpZ3VyYXRpb25fdGFibGUgPSBbXG4gIC8qICAgICAgZ29vZCBsYXp5IG5pY2UgY2hhaW4gKi9cbiAgbmV3IENvbmZpZygwLCAwLCAwLCAwLCBkZWZsYXRlX3N0b3JlZCksICAgICAgICAgIC8qIDAgc3RvcmUgb25seSAqL1xuICBuZXcgQ29uZmlnKDQsIDQsIDgsIDQsIGRlZmxhdGVfZmFzdCksICAgICAgICAgICAgLyogMSBtYXggc3BlZWQsIG5vIGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDQsIDUsIDE2LCA4LCBkZWZsYXRlX2Zhc3QpLCAgICAgICAgICAgLyogMiAqL1xuICBuZXcgQ29uZmlnKDQsIDYsIDMyLCAzMiwgZGVmbGF0ZV9mYXN0KSwgICAgICAgICAgLyogMyAqL1xuXG4gIG5ldyBDb25maWcoNCwgNCwgMTYsIDE2LCBkZWZsYXRlX3Nsb3cpLCAgICAgICAgICAvKiA0IGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAzMiwgMzIsIGRlZmxhdGVfc2xvdyksICAgICAgICAgLyogNSAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAxMjgsIDEyOCwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNiAqL1xuICBuZXcgQ29uZmlnKDgsIDMyLCAxMjgsIDI1NiwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNyAqL1xuICBuZXcgQ29uZmlnKDMyLCAxMjgsIDI1OCwgMTAyNCwgZGVmbGF0ZV9zbG93KSwgICAgLyogOCAqL1xuICBuZXcgQ29uZmlnKDMyLCAyNTgsIDI1OCwgNDA5NiwgZGVmbGF0ZV9zbG93KSAgICAgLyogOSBtYXggY29tcHJlc3Npb24gKi9cbl07XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIHRoZSBcImxvbmdlc3QgbWF0Y2hcIiByb3V0aW5lcyBmb3IgYSBuZXcgemxpYiBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gbG1faW5pdChzKSB7XG4gIHMud2luZG93X3NpemUgPSAyICogcy53X3NpemU7XG5cbiAgLyoqKiBDTEVBUl9IQVNIKHMpOyAqKiovXG4gIHplcm8ocy5oZWFkKTsgLy8gRmlsbCB3aXRoIE5JTCAoPSAwKTtcblxuICAvKiBTZXQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzOlxuICAgKi9cbiAgcy5tYXhfbGF6eV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2xhenk7XG4gIHMuZ29vZF9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0uZ29vZF9sZW5ndGg7XG4gIHMubmljZV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubmljZV9sZW5ndGg7XG4gIHMubWF4X2NoYWluX2xlbmd0aCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2NoYWluO1xuXG4gIHMuc3Ryc3RhcnQgPSAwO1xuICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgcy5sb29rYWhlYWQgPSAwO1xuICBzLmluc2VydCA9IDA7XG4gIHMubWF0Y2hfbGVuZ3RoID0gcy5wcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XG4gIHMubWF0Y2hfYXZhaWxhYmxlID0gMDtcbiAgcy5pbnNfaCA9IDA7XG59XG5cblxuZnVuY3Rpb24gRGVmbGF0ZVN0YXRlKCkge1xuICB0aGlzLnN0cm0gPSBudWxsOyAgICAgICAgICAgIC8qIHBvaW50ZXIgYmFjayB0byB0aGlzIHpsaWIgc3RyZWFtICovXG4gIHRoaXMuc3RhdHVzID0gMDsgICAgICAgICAgICAvKiBhcyB0aGUgbmFtZSBpbXBsaWVzICovXG4gIHRoaXMucGVuZGluZ19idWYgPSBudWxsOyAgICAgIC8qIG91dHB1dCBzdGlsbCBwZW5kaW5nICovXG4gIHRoaXMucGVuZGluZ19idWZfc2l6ZSA9IDA7ICAvKiBzaXplIG9mIHBlbmRpbmdfYnVmICovXG4gIHRoaXMucGVuZGluZ19vdXQgPSAwOyAgICAgICAvKiBuZXh0IHBlbmRpbmcgYnl0ZSB0byBvdXRwdXQgdG8gdGhlIHN0cmVhbSAqL1xuICB0aGlzLnBlbmRpbmcgPSAwOyAgICAgICAgICAgLyogbmIgb2YgYnl0ZXMgaW4gdGhlIHBlbmRpbmcgYnVmZmVyICovXG4gIHRoaXMud3JhcCA9IDA7ICAgICAgICAgICAgICAvKiBiaXQgMCB0cnVlIGZvciB6bGliLCBiaXQgMSB0cnVlIGZvciBnemlwICovXG4gIHRoaXMuZ3poZWFkID0gbnVsbDsgICAgICAgICAvKiBnemlwIGhlYWRlciBpbmZvcm1hdGlvbiB0byB3cml0ZSAqL1xuICB0aGlzLmd6aW5kZXggPSAwOyAgICAgICAgICAgLyogd2hlcmUgaW4gZXh0cmEsIG5hbWUsIG9yIGNvbW1lbnQgKi9cbiAgdGhpcy5tZXRob2QgPSBaX0RFRkxBVEVEOyAvKiBjYW4gb25seSBiZSBERUZMQVRFRCAqL1xuICB0aGlzLmxhc3RfZmx1c2ggPSAtMTsgICAvKiB2YWx1ZSBvZiBmbHVzaCBwYXJhbSBmb3IgcHJldmlvdXMgZGVmbGF0ZSBjYWxsICovXG5cbiAgdGhpcy53X3NpemUgPSAwOyAgLyogTFo3NyB3aW5kb3cgc2l6ZSAoMzJLIGJ5IGRlZmF1bHQpICovXG4gIHRoaXMud19iaXRzID0gMDsgIC8qIGxvZzIod19zaXplKSAgKDguLjE2KSAqL1xuICB0aGlzLndfbWFzayA9IDA7ICAvKiB3X3NpemUgLSAxICovXG5cbiAgdGhpcy53aW5kb3cgPSBudWxsO1xuICAvKiBTbGlkaW5nIHdpbmRvdy4gSW5wdXQgYnl0ZXMgYXJlIHJlYWQgaW50byB0aGUgc2Vjb25kIGhhbGYgb2YgdGhlIHdpbmRvdyxcbiAgICogYW5kIG1vdmUgdG8gdGhlIGZpcnN0IGhhbGYgbGF0ZXIgdG8ga2VlcCBhIGRpY3Rpb25hcnkgb2YgYXQgbGVhc3Qgd1NpemVcbiAgICogYnl0ZXMuIFdpdGggdGhpcyBvcmdhbml6YXRpb24sIG1hdGNoZXMgYXJlIGxpbWl0ZWQgdG8gYSBkaXN0YW5jZSBvZlxuICAgKiB3U2l6ZS1NQVhfTUFUQ0ggYnl0ZXMsIGJ1dCB0aGlzIGVuc3VyZXMgdGhhdCBJTyBpcyBhbHdheXNcbiAgICogcGVyZm9ybWVkIHdpdGggYSBsZW5ndGggbXVsdGlwbGUgb2YgdGhlIGJsb2NrIHNpemUuXG4gICAqL1xuXG4gIHRoaXMud2luZG93X3NpemUgPSAwO1xuICAvKiBBY3R1YWwgc2l6ZSBvZiB3aW5kb3c6IDIqd1NpemUsIGV4Y2VwdCB3aGVuIHRoZSB1c2VyIGlucHV0IGJ1ZmZlclxuICAgKiBpcyBkaXJlY3RseSB1c2VkIGFzIHNsaWRpbmcgd2luZG93LlxuICAgKi9cblxuICB0aGlzLnByZXYgPSBudWxsO1xuICAvKiBMaW5rIHRvIG9sZGVyIHN0cmluZyB3aXRoIHNhbWUgaGFzaCBpbmRleC4gVG8gbGltaXQgdGhlIHNpemUgb2YgdGhpc1xuICAgKiBhcnJheSB0byA2NEssIHRoaXMgbGluayBpcyBtYWludGFpbmVkIG9ubHkgZm9yIHRoZSBsYXN0IDMySyBzdHJpbmdzLlxuICAgKiBBbiBpbmRleCBpbiB0aGlzIGFycmF5IGlzIHRodXMgYSB3aW5kb3cgaW5kZXggbW9kdWxvIDMySy5cbiAgICovXG5cbiAgdGhpcy5oZWFkID0gbnVsbDsgICAvKiBIZWFkcyBvZiB0aGUgaGFzaCBjaGFpbnMgb3IgTklMLiAqL1xuXG4gIHRoaXMuaW5zX2ggPSAwOyAgICAgICAvKiBoYXNoIGluZGV4IG9mIHN0cmluZyB0byBiZSBpbnNlcnRlZCAqL1xuICB0aGlzLmhhc2hfc2l6ZSA9IDA7ICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIGhhc2ggdGFibGUgKi9cbiAgdGhpcy5oYXNoX2JpdHMgPSAwOyAgIC8qIGxvZzIoaGFzaF9zaXplKSAqL1xuICB0aGlzLmhhc2hfbWFzayA9IDA7ICAgLyogaGFzaF9zaXplLTEgKi9cblxuICB0aGlzLmhhc2hfc2hpZnQgPSAwO1xuICAvKiBOdW1iZXIgb2YgYml0cyBieSB3aGljaCBpbnNfaCBtdXN0IGJlIHNoaWZ0ZWQgYXQgZWFjaCBpbnB1dFxuICAgKiBzdGVwLiBJdCBtdXN0IGJlIHN1Y2ggdGhhdCBhZnRlciBNSU5fTUFUQ0ggc3RlcHMsIHRoZSBvbGRlc3RcbiAgICogYnl0ZSBubyBsb25nZXIgdGFrZXMgcGFydCBpbiB0aGUgaGFzaCBrZXksIHRoYXQgaXM6XG4gICAqICAgaGFzaF9zaGlmdCAqIE1JTl9NQVRDSCA+PSBoYXNoX2JpdHNcbiAgICovXG5cbiAgdGhpcy5ibG9ja19zdGFydCA9IDA7XG4gIC8qIFdpbmRvdyBwb3NpdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjdXJyZW50IG91dHB1dCBibG9jay4gR2V0c1xuICAgKiBuZWdhdGl2ZSB3aGVuIHRoZSB3aW5kb3cgaXMgbW92ZWQgYmFja3dhcmRzLlxuICAgKi9cblxuICB0aGlzLm1hdGNoX2xlbmd0aCA9IDA7ICAgICAgLyogbGVuZ3RoIG9mIGJlc3QgbWF0Y2ggKi9cbiAgdGhpcy5wcmV2X21hdGNoID0gMDsgICAgICAgIC8qIHByZXZpb3VzIG1hdGNoICovXG4gIHRoaXMubWF0Y2hfYXZhaWxhYmxlID0gMDsgICAvKiBzZXQgaWYgcHJldmlvdXMgbWF0Y2ggZXhpc3RzICovXG4gIHRoaXMuc3Ryc3RhcnQgPSAwOyAgICAgICAgICAvKiBzdGFydCBvZiBzdHJpbmcgdG8gaW5zZXJ0ICovXG4gIHRoaXMubWF0Y2hfc3RhcnQgPSAwOyAgICAgICAvKiBzdGFydCBvZiBtYXRjaGluZyBzdHJpbmcgKi9cbiAgdGhpcy5sb29rYWhlYWQgPSAwOyAgICAgICAgIC8qIG51bWJlciBvZiB2YWxpZCBieXRlcyBhaGVhZCBpbiB3aW5kb3cgKi9cblxuICB0aGlzLnByZXZfbGVuZ3RoID0gMDtcbiAgLyogTGVuZ3RoIG9mIHRoZSBiZXN0IG1hdGNoIGF0IHByZXZpb3VzIHN0ZXAuIE1hdGNoZXMgbm90IGdyZWF0ZXIgdGhhbiB0aGlzXG4gICAqIGFyZSBkaXNjYXJkZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgbGF6eSBtYXRjaCBldmFsdWF0aW9uLlxuICAgKi9cblxuICB0aGlzLm1heF9jaGFpbl9sZW5ndGggPSAwO1xuICAvKiBUbyBzcGVlZCB1cCBkZWZsYXRpb24sIGhhc2ggY2hhaW5zIGFyZSBuZXZlciBzZWFyY2hlZCBiZXlvbmQgdGhpc1xuICAgKiBsZW5ndGguICBBIGhpZ2hlciBsaW1pdCBpbXByb3ZlcyBjb21wcmVzc2lvbiByYXRpbyBidXQgZGVncmFkZXMgdGhlXG4gICAqIHNwZWVkLlxuICAgKi9cblxuICB0aGlzLm1heF9sYXp5X21hdGNoID0gMDtcbiAgLyogQXR0ZW1wdCB0byBmaW5kIGEgYmV0dGVyIG1hdGNoIG9ubHkgd2hlbiB0aGUgY3VycmVudCBtYXRjaCBpcyBzdHJpY3RseVxuICAgKiBzbWFsbGVyIHRoYW4gdGhpcyB2YWx1ZS4gVGhpcyBtZWNoYW5pc20gaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvblxuICAgKiBsZXZlbHMgPj0gNC5cbiAgICovXG4gIC8vIFRoYXQncyBhbGlhcyB0byBtYXhfbGF6eV9tYXRjaCwgZG9uJ3QgdXNlIGRpcmVjdGx5XG4gIC8vdGhpcy5tYXhfaW5zZXJ0X2xlbmd0aCA9IDA7XG4gIC8qIEluc2VydCBuZXcgc3RyaW5ncyBpbiB0aGUgaGFzaCB0YWJsZSBvbmx5IGlmIHRoZSBtYXRjaCBsZW5ndGggaXMgbm90XG4gICAqIGdyZWF0ZXIgdGhhbiB0aGlzIGxlbmd0aC4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICogbWF4X2luc2VydF9sZW5ndGggaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvbiBsZXZlbHMgPD0gMy5cbiAgICovXG5cbiAgdGhpcy5sZXZlbCA9IDA7ICAgICAvKiBjb21wcmVzc2lvbiBsZXZlbCAoMS4uOSkgKi9cbiAgdGhpcy5zdHJhdGVneSA9IDA7ICAvKiBmYXZvciBvciBmb3JjZSBIdWZmbWFuIGNvZGluZyovXG5cbiAgdGhpcy5nb29kX21hdGNoID0gMDtcbiAgLyogVXNlIGEgZmFzdGVyIHNlYXJjaCB3aGVuIHRoZSBwcmV2aW91cyBtYXRjaCBpcyBsb25nZXIgdGhhbiB0aGlzICovXG5cbiAgdGhpcy5uaWNlX21hdGNoID0gMDsgLyogU3RvcCBzZWFyY2hpbmcgd2hlbiBjdXJyZW50IG1hdGNoIGV4Y2VlZHMgdGhpcyAqL1xuXG4gICAgICAgICAgICAgIC8qIHVzZWQgYnkgdHJlZXMuYzogKi9cblxuICAvKiBEaWRuJ3QgdXNlIGN0X2RhdGEgdHlwZWRlZiBiZWxvdyB0byBzdXBwcmVzcyBjb21waWxlciB3YXJuaW5nICovXG5cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBkeW5fbHRyZWVbSEVBUF9TSVpFXTsgICAvKiBsaXRlcmFsIGFuZCBsZW5ndGggdHJlZSAqL1xuICAvLyBzdHJ1Y3QgY3RfZGF0YV9zIGR5bl9kdHJlZVsyKkRfQ09ERVMrMV07IC8qIGRpc3RhbmNlIHRyZWUgKi9cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBibF90cmVlWzIqQkxfQ09ERVMrMV07ICAvKiBIdWZmbWFuIHRyZWUgZm9yIGJpdCBsZW5ndGhzICovXG5cbiAgLy8gVXNlIGZsYXQgYXJyYXkgb2YgRE9VQkxFIHNpemUsIHdpdGggaW50ZXJsZWF2ZWQgZmF0YSxcbiAgLy8gYmVjYXVzZSBKUyBkb2VzIG5vdCBzdXBwb3J0IGVmZmVjdGl2ZVxuICB0aGlzLmR5bl9sdHJlZSAgPSBuZXcgdXRpbHMuQnVmMTYoSEVBUF9TSVpFICogMik7XG4gIHRoaXMuZHluX2R0cmVlICA9IG5ldyB1dGlscy5CdWYxNigoMiAqIERfQ09ERVMgKyAxKSAqIDIpO1xuICB0aGlzLmJsX3RyZWUgICAgPSBuZXcgdXRpbHMuQnVmMTYoKDIgKiBCTF9DT0RFUyArIDEpICogMik7XG4gIHplcm8odGhpcy5keW5fbHRyZWUpO1xuICB6ZXJvKHRoaXMuZHluX2R0cmVlKTtcbiAgemVybyh0aGlzLmJsX3RyZWUpO1xuXG4gIHRoaXMubF9kZXNjICAgPSBudWxsOyAgICAgICAgIC8qIGRlc2MuIGZvciBsaXRlcmFsIHRyZWUgKi9cbiAgdGhpcy5kX2Rlc2MgICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGRpc3RhbmNlIHRyZWUgKi9cbiAgdGhpcy5ibF9kZXNjICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGJpdCBsZW5ndGggdHJlZSAqL1xuXG4gIC8vdXNoIGJsX2NvdW50W01BWF9CSVRTKzFdO1xuICB0aGlzLmJsX2NvdW50ID0gbmV3IHV0aWxzLkJ1ZjE2KE1BWF9CSVRTICsgMSk7XG4gIC8qIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggZm9yIGFuIG9wdGltYWwgdHJlZSAqL1xuXG4gIC8vaW50IGhlYXBbMipMX0NPREVTKzFdOyAgICAgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB0aGlzLmhlYXAgPSBuZXcgdXRpbHMuQnVmMTYoMiAqIExfQ09ERVMgKyAxKTsgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB6ZXJvKHRoaXMuaGVhcCk7XG5cbiAgdGhpcy5oZWFwX2xlbiA9IDA7ICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBoZWFwICovXG4gIHRoaXMuaGVhcF9tYXggPSAwOyAgICAgICAgICAgICAgIC8qIGVsZW1lbnQgb2YgbGFyZ2VzdCBmcmVxdWVuY3kgKi9cbiAgLyogVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS4gaGVhcFswXSBpcyBub3QgdXNlZC5cbiAgICogVGhlIHNhbWUgaGVhcCBhcnJheSBpcyB1c2VkIHRvIGJ1aWxkIGFsbCB0cmVlcy5cbiAgICovXG5cbiAgdGhpcy5kZXB0aCA9IG5ldyB1dGlscy5CdWYxNigyICogTF9DT0RFUyArIDEpOyAvL3VjaCBkZXB0aFsyKkxfQ09ERVMrMV07XG4gIHplcm8odGhpcy5kZXB0aCk7XG4gIC8qIERlcHRoIG9mIGVhY2ggc3VidHJlZSB1c2VkIGFzIHRpZSBicmVha2VyIGZvciB0cmVlcyBvZiBlcXVhbCBmcmVxdWVuY3lcbiAgICovXG5cbiAgdGhpcy5sX2J1ZiA9IDA7ICAgICAgICAgIC8qIGJ1ZmZlciBpbmRleCBmb3IgbGl0ZXJhbHMgb3IgbGVuZ3RocyAqL1xuXG4gIHRoaXMubGl0X2J1ZnNpemUgPSAwO1xuICAvKiBTaXplIG9mIG1hdGNoIGJ1ZmZlciBmb3IgbGl0ZXJhbHMvbGVuZ3Rocy4gIFRoZXJlIGFyZSA0IHJlYXNvbnMgZm9yXG4gICAqIGxpbWl0aW5nIGxpdF9idWZzaXplIHRvIDY0SzpcbiAgICogICAtIGZyZXF1ZW5jaWVzIGNhbiBiZSBrZXB0IGluIDE2IGJpdCBjb3VudGVyc1xuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIHRoZSBmaXJzdCBibG9jaywgYWxsIGlucHV0XG4gICAqICAgICBkYXRhIGlzIHN0aWxsIGluIHRoZSB3aW5kb3cgc28gd2UgY2FuIHN0aWxsIGVtaXQgYSBzdG9yZWQgYmxvY2sgZXZlblxuICAgKiAgICAgd2hlbiBpbnB1dCBjb21lcyBmcm9tIHN0YW5kYXJkIGlucHV0LiAgKFRoaXMgY2FuIGFsc28gYmUgZG9uZSBmb3JcbiAgICogICAgIGFsbCBibG9ja3MgaWYgbGl0X2J1ZnNpemUgaXMgbm90IGdyZWF0ZXIgdGhhbiAzMksuKVxuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIGEgZmlsZSBzbWFsbGVyIHRoYW4gNjRLLCB3ZSBjYW5cbiAgICogICAgIGV2ZW4gZW1pdCBhIHN0b3JlZCBmaWxlIGluc3RlYWQgb2YgYSBzdG9yZWQgYmxvY2sgKHNhdmluZyA1IGJ5dGVzKS5cbiAgICogICAgIFRoaXMgaXMgYXBwbGljYWJsZSBvbmx5IGZvciB6aXAgKG5vdCBnemlwIG9yIHpsaWIpLlxuICAgKiAgIC0gY3JlYXRpbmcgbmV3IEh1ZmZtYW4gdHJlZXMgbGVzcyBmcmVxdWVudGx5IG1heSBub3QgcHJvdmlkZSBmYXN0XG4gICAqICAgICBhZGFwdGF0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIGlucHV0IGRhdGEgc3RhdGlzdGljcy4gKFRha2UgZm9yXG4gICAqICAgICBleGFtcGxlIGEgYmluYXJ5IGZpbGUgd2l0aCBwb29ybHkgY29tcHJlc3NpYmxlIGNvZGUgZm9sbG93ZWQgYnlcbiAgICogICAgIGEgaGlnaGx5IGNvbXByZXNzaWJsZSBzdHJpbmcgdGFibGUuKSBTbWFsbGVyIGJ1ZmZlciBzaXplcyBnaXZlXG4gICAqICAgICBmYXN0IGFkYXB0YXRpb24gYnV0IGhhdmUgb2YgY291cnNlIHRoZSBvdmVyaGVhZCBvZiB0cmFuc21pdHRpbmdcbiAgICogICAgIHRyZWVzIG1vcmUgZnJlcXVlbnRseS5cbiAgICogICAtIEkgY2FuJ3QgY291bnQgYWJvdmUgNFxuICAgKi9cblxuICB0aGlzLmxhc3RfbGl0ID0gMDsgICAgICAvKiBydW5uaW5nIGluZGV4IGluIGxfYnVmICovXG5cbiAgdGhpcy5kX2J1ZiA9IDA7XG4gIC8qIEJ1ZmZlciBpbmRleCBmb3IgZGlzdGFuY2VzLiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgZF9idWYgYW5kIGxfYnVmIGhhdmVcbiAgICogdGhlIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzLiBUbyB1c2UgZGlmZmVyZW50IGxlbmd0aHMsIGFuIGV4dHJhIGZsYWdcbiAgICogYXJyYXkgd291bGQgYmUgbmVjZXNzYXJ5LlxuICAgKi9cblxuICB0aGlzLm9wdF9sZW4gPSAwOyAgICAgICAvKiBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBvcHRpbWFsIHRyZWVzICovXG4gIHRoaXMuc3RhdGljX2xlbiA9IDA7ICAgIC8qIGJpdCBsZW5ndGggb2YgY3VycmVudCBibG9jayB3aXRoIHN0YXRpYyB0cmVlcyAqL1xuICB0aGlzLm1hdGNoZXMgPSAwOyAgICAgICAvKiBudW1iZXIgb2Ygc3RyaW5nIG1hdGNoZXMgaW4gY3VycmVudCBibG9jayAqL1xuICB0aGlzLmluc2VydCA9IDA7ICAgICAgICAvKiBieXRlcyBhdCBlbmQgb2Ygd2luZG93IGxlZnQgdG8gaW5zZXJ0ICovXG5cblxuICB0aGlzLmJpX2J1ZiA9IDA7XG4gIC8qIE91dHB1dCBidWZmZXIuIGJpdHMgYXJlIGluc2VydGVkIHN0YXJ0aW5nIGF0IHRoZSBib3R0b20gKGxlYXN0XG4gICAqIHNpZ25pZmljYW50IGJpdHMpLlxuICAgKi9cbiAgdGhpcy5iaV92YWxpZCA9IDA7XG4gIC8qIE51bWJlciBvZiB2YWxpZCBiaXRzIGluIGJpX2J1Zi4gIEFsbCBiaXRzIGFib3ZlIHRoZSBsYXN0IHZhbGlkIGJpdFxuICAgKiBhcmUgYWx3YXlzIHplcm8uXG4gICAqL1xuXG4gIC8vIFVzZWQgZm9yIHdpbmRvdyBtZW1vcnkgaW5pdC4gV2Ugc2FmZWx5IGlnbm9yZSBpdCBmb3IgSlMuIFRoYXQgbWFrZXNcbiAgLy8gc2Vuc2Ugb25seSBmb3IgcG9pbnRlcnMgYW5kIG1lbW9yeSBjaGVjayB0b29scy5cbiAgLy90aGlzLmhpZ2hfd2F0ZXIgPSAwO1xuICAvKiBIaWdoIHdhdGVyIG1hcmsgb2Zmc2V0IGluIHdpbmRvdyBmb3IgaW5pdGlhbGl6ZWQgYnl0ZXMgLS0gYnl0ZXMgYWJvdmVcbiAgICogdGhpcyBhcmUgc2V0IHRvIHplcm8gaW4gb3JkZXIgdG8gYXZvaWQgbWVtb3J5IGNoZWNrIHdhcm5pbmdzIHdoZW5cbiAgICogbG9uZ2VzdCBtYXRjaCByb3V0aW5lcyBhY2Nlc3MgYnl0ZXMgcGFzdCB0aGUgaW5wdXQuICBUaGlzIGlzIHRoZW5cbiAgICogdXBkYXRlZCB0byB0aGUgbmV3IGhpZ2ggd2F0ZXIgbWFyay5cbiAgICovXG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZVJlc2V0S2VlcChzdHJtKSB7XG4gIHZhciBzO1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgc3RybS50b3RhbF9pbiA9IHN0cm0udG90YWxfb3V0ID0gMDtcbiAgc3RybS5kYXRhX3R5cGUgPSBaX1VOS05PV047XG5cbiAgcyA9IHN0cm0uc3RhdGU7XG4gIHMucGVuZGluZyA9IDA7XG4gIHMucGVuZGluZ19vdXQgPSAwO1xuXG4gIGlmIChzLndyYXAgPCAwKSB7XG4gICAgcy53cmFwID0gLXMud3JhcDtcbiAgICAvKiB3YXMgbWFkZSBuZWdhdGl2ZSBieSBkZWZsYXRlKC4uLiwgWl9GSU5JU0gpOyAqL1xuICB9XG4gIHMuc3RhdHVzID0gKHMud3JhcCA/IElOSVRfU1RBVEUgOiBCVVNZX1NUQVRFKTtcbiAgc3RybS5hZGxlciA9IChzLndyYXAgPT09IDIpID9cbiAgICAwICAvLyBjcmMzMigwLCBaX05VTEwsIDApXG4gIDpcbiAgICAxOyAvLyBhZGxlcjMyKDAsIFpfTlVMTCwgMClcbiAgcy5sYXN0X2ZsdXNoID0gWl9OT19GTFVTSDtcbiAgdHJlZXMuX3RyX2luaXQocyk7XG4gIHJldHVybiBaX09LO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVSZXNldChzdHJtKSB7XG4gIHZhciByZXQgPSBkZWZsYXRlUmVzZXRLZWVwKHN0cm0pO1xuICBpZiAocmV0ID09PSBaX09LKSB7XG4gICAgbG1faW5pdChzdHJtLnN0YXRlKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVTZXRIZWFkZXIoc3RybSwgaGVhZCkge1xuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIGlmIChzdHJtLnN0YXRlLndyYXAgIT09IDIpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0cm0uc3RhdGUuZ3poZWFkID0gaGVhZDtcbiAgcmV0dXJuIFpfT0s7XG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQyKHN0cm0sIGxldmVsLCBtZXRob2QsIHdpbmRvd0JpdHMsIG1lbUxldmVsLCBzdHJhdGVneSkge1xuICBpZiAoIXN0cm0pIHsgLy8gPT09IFpfTlVMTFxuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuICB2YXIgd3JhcCA9IDE7XG5cbiAgaWYgKGxldmVsID09PSBaX0RFRkFVTFRfQ09NUFJFU1NJT04pIHtcbiAgICBsZXZlbCA9IDY7XG4gIH1cblxuICBpZiAod2luZG93Qml0cyA8IDApIHsgLyogc3VwcHJlc3MgemxpYiB3cmFwcGVyICovXG4gICAgd3JhcCA9IDA7XG4gICAgd2luZG93Qml0cyA9IC13aW5kb3dCaXRzO1xuICB9XG5cbiAgZWxzZSBpZiAod2luZG93Qml0cyA+IDE1KSB7XG4gICAgd3JhcCA9IDI7ICAgICAgICAgICAvKiB3cml0ZSBnemlwIHdyYXBwZXIgaW5zdGVhZCAqL1xuICAgIHdpbmRvd0JpdHMgLT0gMTY7XG4gIH1cblxuXG4gIGlmIChtZW1MZXZlbCA8IDEgfHwgbWVtTGV2ZWwgPiBNQVhfTUVNX0xFVkVMIHx8IG1ldGhvZCAhPT0gWl9ERUZMQVRFRCB8fFxuICAgIHdpbmRvd0JpdHMgPCA4IHx8IHdpbmRvd0JpdHMgPiAxNSB8fCBsZXZlbCA8IDAgfHwgbGV2ZWwgPiA5IHx8XG4gICAgc3RyYXRlZ3kgPCAwIHx8IHN0cmF0ZWd5ID4gWl9GSVhFRCkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cblxuICBpZiAod2luZG93Qml0cyA9PT0gOCkge1xuICAgIHdpbmRvd0JpdHMgPSA5O1xuICB9XG4gIC8qIHVudGlsIDI1Ni1ieXRlIHdpbmRvdyBidWcgZml4ZWQgKi9cblxuICB2YXIgcyA9IG5ldyBEZWZsYXRlU3RhdGUoKTtcblxuICBzdHJtLnN0YXRlID0gcztcbiAgcy5zdHJtID0gc3RybTtcblxuICBzLndyYXAgPSB3cmFwO1xuICBzLmd6aGVhZCA9IG51bGw7XG4gIHMud19iaXRzID0gd2luZG93Qml0cztcbiAgcy53X3NpemUgPSAxIDw8IHMud19iaXRzO1xuICBzLndfbWFzayA9IHMud19zaXplIC0gMTtcblxuICBzLmhhc2hfYml0cyA9IG1lbUxldmVsICsgNztcbiAgcy5oYXNoX3NpemUgPSAxIDw8IHMuaGFzaF9iaXRzO1xuICBzLmhhc2hfbWFzayA9IHMuaGFzaF9zaXplIC0gMTtcbiAgcy5oYXNoX3NoaWZ0ID0gfn4oKHMuaGFzaF9iaXRzICsgTUlOX01BVENIIC0gMSkgLyBNSU5fTUFUQ0gpO1xuXG4gIHMud2luZG93ID0gbmV3IHV0aWxzLkJ1Zjgocy53X3NpemUgKiAyKTtcbiAgcy5oZWFkID0gbmV3IHV0aWxzLkJ1ZjE2KHMuaGFzaF9zaXplKTtcbiAgcy5wcmV2ID0gbmV3IHV0aWxzLkJ1ZjE2KHMud19zaXplKTtcblxuICAvLyBEb24ndCBuZWVkIG1lbSBpbml0IG1hZ2ljIGZvciBKUy5cbiAgLy9zLmhpZ2hfd2F0ZXIgPSAwOyAgLyogbm90aGluZyB3cml0dGVuIHRvIHMtPndpbmRvdyB5ZXQgKi9cblxuICBzLmxpdF9idWZzaXplID0gMSA8PCAobWVtTGV2ZWwgKyA2KTsgLyogMTZLIGVsZW1lbnRzIGJ5IGRlZmF1bHQgKi9cblxuICBzLnBlbmRpbmdfYnVmX3NpemUgPSBzLmxpdF9idWZzaXplICogNDtcblxuICAvL292ZXJsYXkgPSAodXNoZiAqKSBaQUxMT0Moc3RybSwgcy0+bGl0X2J1ZnNpemUsIHNpemVvZih1c2gpKzIpO1xuICAvL3MtPnBlbmRpbmdfYnVmID0gKHVjaGYgKikgb3ZlcmxheTtcbiAgcy5wZW5kaW5nX2J1ZiA9IG5ldyB1dGlscy5CdWY4KHMucGVuZGluZ19idWZfc2l6ZSk7XG5cbiAgLy8gSXQgaXMgb2Zmc2V0IGZyb20gYHMucGVuZGluZ19idWZgIChzaXplIGlzIGBzLmxpdF9idWZzaXplICogMmApXG4gIC8vcy0+ZF9idWYgPSBvdmVybGF5ICsgcy0+bGl0X2J1ZnNpemUvc2l6ZW9mKHVzaCk7XG4gIHMuZF9idWYgPSAxICogcy5saXRfYnVmc2l6ZTtcblxuICAvL3MtPmxfYnVmID0gcy0+cGVuZGluZ19idWYgKyAoMStzaXplb2YodXNoKSkqcy0+bGl0X2J1ZnNpemU7XG4gIHMubF9idWYgPSAoMSArIDIpICogcy5saXRfYnVmc2l6ZTtcblxuICBzLmxldmVsID0gbGV2ZWw7XG4gIHMuc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgcy5tZXRob2QgPSBtZXRob2Q7XG5cbiAgcmV0dXJuIGRlZmxhdGVSZXNldChzdHJtKTtcbn1cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQoc3RybSwgbGV2ZWwpIHtcbiAgcmV0dXJuIGRlZmxhdGVJbml0MihzdHJtLCBsZXZlbCwgWl9ERUZMQVRFRCwgTUFYX1dCSVRTLCBERUZfTUVNX0xFVkVMLCBaX0RFRkFVTFRfU1RSQVRFR1kpO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGUoc3RybSwgZmx1c2gpIHtcbiAgdmFyIG9sZF9mbHVzaCwgcztcbiAgdmFyIGJlZywgdmFsOyAvLyBmb3IgZ3ppcCBoZWFkZXIgd3JpdGUgb25seVxuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSB8fFxuICAgIGZsdXNoID4gWl9CTE9DSyB8fCBmbHVzaCA8IDApIHtcbiAgICByZXR1cm4gc3RybSA/IGVycihzdHJtLCBaX1NUUkVBTV9FUlJPUikgOiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuXG4gIHMgPSBzdHJtLnN0YXRlO1xuXG4gIGlmICghc3RybS5vdXRwdXQgfHxcbiAgICAgICghc3RybS5pbnB1dCAmJiBzdHJtLmF2YWlsX2luICE9PSAwKSB8fFxuICAgICAgKHMuc3RhdHVzID09PSBGSU5JU0hfU1RBVEUgJiYgZmx1c2ggIT09IFpfRklOSVNIKSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSA/IFpfQlVGX0VSUk9SIDogWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgcy5zdHJtID0gc3RybTsgLyoganVzdCBpbiBjYXNlICovXG4gIG9sZF9mbHVzaCA9IHMubGFzdF9mbHVzaDtcbiAgcy5sYXN0X2ZsdXNoID0gZmx1c2g7XG5cbiAgLyogV3JpdGUgdGhlIGhlYWRlciAqL1xuICBpZiAocy5zdGF0dXMgPT09IElOSVRfU1RBVEUpIHtcblxuICAgIGlmIChzLndyYXAgPT09IDIpIHsgLy8gR1pJUCBoZWFkZXJcbiAgICAgIHN0cm0uYWRsZXIgPSAwOyAgLy9jcmMzMigwTCwgWl9OVUxMLCAwKTtcbiAgICAgIHB1dF9ieXRlKHMsIDMxKTtcbiAgICAgIHB1dF9ieXRlKHMsIDEzOSk7XG4gICAgICBwdXRfYnl0ZShzLCA4KTtcbiAgICAgIGlmICghcy5nemhlYWQpIHsgLy8gcy0+Z3poZWFkID09IFpfTlVMTFxuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIDApO1xuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIHMubGV2ZWwgPT09IDkgPyAyIDpcbiAgICAgICAgICAgICAgICAgICAgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIgP1xuICAgICAgICAgICAgICAgICAgICAgNCA6IDApKTtcbiAgICAgICAgcHV0X2J5dGUocywgT1NfQ09ERSk7XG4gICAgICAgIHMuc3RhdHVzID0gQlVTWV9TVEFURTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGV4dCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChzLmd6aGVhZC5oY3JjID8gMiA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKCFzLmd6aGVhZC5leHRyYSA/IDAgOiA0KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQubmFtZSA/IDAgOiA4KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQuY29tbWVudCA/IDAgOiAxNilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICBwdXRfYnl0ZShzLCBzLmd6aGVhZC50aW1lICYgMHhmZik7XG4gICAgICAgIHB1dF9ieXRlKHMsIChzLmd6aGVhZC50aW1lID4+IDgpICYgMHhmZik7XG4gICAgICAgIHB1dF9ieXRlKHMsIChzLmd6aGVhZC50aW1lID4+IDE2KSAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGltZSA+PiAyNCkgJiAweGZmKTtcbiAgICAgICAgcHV0X2J5dGUocywgcy5sZXZlbCA9PT0gOSA/IDIgOlxuICAgICAgICAgICAgICAgICAgICAocy5zdHJhdGVneSA+PSBaX0hVRkZNQU5fT05MWSB8fCBzLmxldmVsIDwgMiA/XG4gICAgICAgICAgICAgICAgICAgICA0IDogMCkpO1xuICAgICAgICBwdXRfYnl0ZShzLCBzLmd6aGVhZC5vcyAmIDB4ZmYpO1xuICAgICAgICBpZiAocy5nemhlYWQuZXh0cmEgJiYgcy5nemhlYWQuZXh0cmEubGVuZ3RoKSB7XG4gICAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQuZXh0cmEubGVuZ3RoICYgMHhmZik7XG4gICAgICAgICAgcHV0X2J5dGUocywgKHMuZ3poZWFkLmV4dHJhLmxlbmd0aCA+PiA4KSAmIDB4ZmYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzLmd6aGVhZC5oY3JjKSB7XG4gICAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZywgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcy5nemluZGV4ID0gMDtcbiAgICAgICAgcy5zdGF0dXMgPSBFWFRSQV9TVEFURTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSAvLyBERUZMQVRFIGhlYWRlclxuICAgIHtcbiAgICAgIHZhciBoZWFkZXIgPSAoWl9ERUZMQVRFRCArICgocy53X2JpdHMgLSA4KSA8PCA0KSkgPDwgODtcbiAgICAgIHZhciBsZXZlbF9mbGFncyA9IC0xO1xuXG4gICAgICBpZiAocy5zdHJhdGVneSA+PSBaX0hVRkZNQU5fT05MWSB8fCBzLmxldmVsIDwgMikge1xuICAgICAgICBsZXZlbF9mbGFncyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHMubGV2ZWwgPCA2KSB7XG4gICAgICAgIGxldmVsX2ZsYWdzID0gMTtcbiAgICAgIH0gZWxzZSBpZiAocy5sZXZlbCA9PT0gNikge1xuICAgICAgICBsZXZlbF9mbGFncyA9IDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXZlbF9mbGFncyA9IDM7XG4gICAgICB9XG4gICAgICBoZWFkZXIgfD0gKGxldmVsX2ZsYWdzIDw8IDYpO1xuICAgICAgaWYgKHMuc3Ryc3RhcnQgIT09IDApIHsgaGVhZGVyIHw9IFBSRVNFVF9ESUNUOyB9XG4gICAgICBoZWFkZXIgKz0gMzEgLSAoaGVhZGVyICUgMzEpO1xuXG4gICAgICBzLnN0YXR1cyA9IEJVU1lfU1RBVEU7XG4gICAgICBwdXRTaG9ydE1TQihzLCBoZWFkZXIpO1xuXG4gICAgICAvKiBTYXZlIHRoZSBhZGxlcjMyIG9mIHRoZSBwcmVzZXQgZGljdGlvbmFyeTogKi9cbiAgICAgIGlmIChzLnN0cnN0YXJ0ICE9PSAwKSB7XG4gICAgICAgIHB1dFNob3J0TVNCKHMsIHN0cm0uYWRsZXIgPj4+IDE2KTtcbiAgICAgICAgcHV0U2hvcnRNU0Iocywgc3RybS5hZGxlciAmIDB4ZmZmZik7XG4gICAgICB9XG4gICAgICBzdHJtLmFkbGVyID0gMTsgLy8gYWRsZXIzMigwTCwgWl9OVUxMLCAwKTtcbiAgICB9XG4gIH1cblxuLy8jaWZkZWYgR1pJUFxuICBpZiAocy5zdGF0dXMgPT09IEVYVFJBX1NUQVRFKSB7XG4gICAgaWYgKHMuZ3poZWFkLmV4dHJhLyogIT0gWl9OVUxMKi8pIHtcbiAgICAgIGJlZyA9IHMucGVuZGluZzsgIC8qIHN0YXJ0IG9mIGJ5dGVzIHRvIHVwZGF0ZSBjcmMgKi9cblxuICAgICAgd2hpbGUgKHMuZ3ppbmRleCA8IChzLmd6aGVhZC5leHRyYS5sZW5ndGggJiAweGZmZmYpKSB7XG4gICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgIGlmIChzLmd6aGVhZC5oY3JjICYmIHMucGVuZGluZyA+IGJlZykge1xuICAgICAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICAgICAgICBiZWcgPSBzLnBlbmRpbmc7XG4gICAgICAgICAgaWYgKHMucGVuZGluZyA9PT0gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQuZXh0cmFbcy5nemluZGV4XSAmIDB4ZmYpO1xuICAgICAgICBzLmd6aW5kZXgrKztcbiAgICAgIH1cbiAgICAgIGlmIChzLmd6aGVhZC5oY3JjICYmIHMucGVuZGluZyA+IGJlZykge1xuICAgICAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgcy5wZW5kaW5nX2J1Ziwgcy5wZW5kaW5nIC0gYmVnLCBiZWcpO1xuICAgICAgfVxuICAgICAgaWYgKHMuZ3ppbmRleCA9PT0gcy5nemhlYWQuZXh0cmEubGVuZ3RoKSB7XG4gICAgICAgIHMuZ3ppbmRleCA9IDA7XG4gICAgICAgIHMuc3RhdHVzID0gTkFNRV9TVEFURTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzLnN0YXR1cyA9IE5BTUVfU1RBVEU7XG4gICAgfVxuICB9XG4gIGlmIChzLnN0YXR1cyA9PT0gTkFNRV9TVEFURSkge1xuICAgIGlmIChzLmd6aGVhZC5uYW1lLyogIT0gWl9OVUxMKi8pIHtcbiAgICAgIGJlZyA9IHMucGVuZGluZzsgIC8qIHN0YXJ0IG9mIGJ5dGVzIHRvIHVwZGF0ZSBjcmMgKi9cbiAgICAgIC8vaW50IHZhbDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICAgICAgYmVnID0gcy5wZW5kaW5nO1xuICAgICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgICAgdmFsID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBKUyBzcGVjaWZpYzogbGl0dGxlIG1hZ2ljIHRvIGFkZCB6ZXJvIHRlcm1pbmF0b3IgdG8gZW5kIG9mIHN0cmluZ1xuICAgICAgICBpZiAocy5nemluZGV4IDwgcy5nemhlYWQubmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICB2YWwgPSBzLmd6aGVhZC5uYW1lLmNoYXJDb2RlQXQocy5nemluZGV4KyspICYgMHhmZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHB1dF9ieXRlKHMsIHZhbCk7XG4gICAgICB9IHdoaWxlICh2YWwgIT09IDApO1xuXG4gICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IDApIHtcbiAgICAgICAgcy5nemluZGV4ID0gMDtcbiAgICAgICAgcy5zdGF0dXMgPSBDT01NRU5UX1NUQVRFO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHMuc3RhdHVzID0gQ09NTUVOVF9TVEFURTtcbiAgICB9XG4gIH1cbiAgaWYgKHMuc3RhdHVzID09PSBDT01NRU5UX1NUQVRFKSB7XG4gICAgaWYgKHMuZ3poZWFkLmNvbW1lbnQvKiAhPSBaX05VTEwqLykge1xuICAgICAgYmVnID0gcy5wZW5kaW5nOyAgLyogc3RhcnQgb2YgYnl0ZXMgdG8gdXBkYXRlIGNyYyAqL1xuICAgICAgLy9pbnQgdmFsO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgIGlmIChzLmd6aGVhZC5oY3JjICYmIHMucGVuZGluZyA+IGJlZykge1xuICAgICAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICAgICAgICBiZWcgPSBzLnBlbmRpbmc7XG4gICAgICAgICAgaWYgKHMucGVuZGluZyA9PT0gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgICAgICB2YWwgPSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEpTIHNwZWNpZmljOiBsaXR0bGUgbWFnaWMgdG8gYWRkIHplcm8gdGVybWluYXRvciB0byBlbmQgb2Ygc3RyaW5nXG4gICAgICAgIGlmIChzLmd6aW5kZXggPCBzLmd6aGVhZC5jb21tZW50Lmxlbmd0aCkge1xuICAgICAgICAgIHZhbCA9IHMuZ3poZWFkLmNvbW1lbnQuY2hhckNvZGVBdChzLmd6aW5kZXgrKykgJiAweGZmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcHV0X2J5dGUocywgdmFsKTtcbiAgICAgIH0gd2hpbGUgKHZhbCAhPT0gMCk7XG5cbiAgICAgIGlmIChzLmd6aGVhZC5oY3JjICYmIHMucGVuZGluZyA+IGJlZykge1xuICAgICAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgcy5wZW5kaW5nX2J1Ziwgcy5wZW5kaW5nIC0gYmVnLCBiZWcpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA9PT0gMCkge1xuICAgICAgICBzLnN0YXR1cyA9IEhDUkNfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcy5zdGF0dXMgPSBIQ1JDX1NUQVRFO1xuICAgIH1cbiAgfVxuICBpZiAocy5zdGF0dXMgPT09IEhDUkNfU1RBVEUpIHtcbiAgICBpZiAocy5nemhlYWQuaGNyYykge1xuICAgICAgaWYgKHMucGVuZGluZyArIDIgPiBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICAgIH1cbiAgICAgIGlmIChzLnBlbmRpbmcgKyAyIDw9IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICBwdXRfYnl0ZShzLCBzdHJtLmFkbGVyICYgMHhmZik7XG4gICAgICAgIHB1dF9ieXRlKHMsIChzdHJtLmFkbGVyID4+IDgpICYgMHhmZik7XG4gICAgICAgIHN0cm0uYWRsZXIgPSAwOyAvL2NyYzMyKDBMLCBaX05VTEwsIDApO1xuICAgICAgICBzLnN0YXR1cyA9IEJVU1lfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcy5zdGF0dXMgPSBCVVNZX1NUQVRFO1xuICAgIH1cbiAgfVxuLy8jZW5kaWZcblxuICAvKiBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlICovXG4gIGlmIChzLnBlbmRpbmcgIT09IDApIHtcbiAgICBmbHVzaF9wZW5kaW5nKHN0cm0pO1xuICAgIGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgLyogU2luY2UgYXZhaWxfb3V0IGlzIDAsIGRlZmxhdGUgd2lsbCBiZSBjYWxsZWQgYWdhaW4gd2l0aFxuICAgICAgICogbW9yZSBvdXRwdXQgc3BhY2UsIGJ1dCBwb3NzaWJseSB3aXRoIGJvdGggcGVuZGluZyBhbmRcbiAgICAgICAqIGF2YWlsX2luIGVxdWFsIHRvIHplcm8uIFRoZXJlIHdvbid0IGJlIGFueXRoaW5nIHRvIGRvLFxuICAgICAgICogYnV0IHRoaXMgaXMgbm90IGFuIGVycm9yIHNpdHVhdGlvbiBzbyBtYWtlIHN1cmUgd2VcbiAgICAgICAqIHJldHVybiBPSyBpbnN0ZWFkIG9mIEJVRl9FUlJPUiBhdCBuZXh0IGNhbGwgb2YgZGVmbGF0ZTpcbiAgICAgICAqL1xuICAgICAgcy5sYXN0X2ZsdXNoID0gLTE7XG4gICAgICByZXR1cm4gWl9PSztcbiAgICB9XG5cbiAgICAvKiBNYWtlIHN1cmUgdGhlcmUgaXMgc29tZXRoaW5nIHRvIGRvIGFuZCBhdm9pZCBkdXBsaWNhdGUgY29uc2VjdXRpdmVcbiAgICAgKiBmbHVzaGVzLiBGb3IgcmVwZWF0ZWQgYW5kIHVzZWxlc3MgY2FsbHMgd2l0aCBaX0ZJTklTSCwgd2Uga2VlcFxuICAgICAqIHJldHVybmluZyBaX1NUUkVBTV9FTkQgaW5zdGVhZCBvZiBaX0JVRl9FUlJPUi5cbiAgICAgKi9cbiAgfSBlbHNlIGlmIChzdHJtLmF2YWlsX2luID09PSAwICYmIHJhbmsoZmx1c2gpIDw9IHJhbmsob2xkX2ZsdXNoKSAmJlxuICAgIGZsdXNoICE9PSBaX0ZJTklTSCkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9CVUZfRVJST1IpO1xuICB9XG5cbiAgLyogVXNlciBtdXN0IG5vdCBwcm92aWRlIG1vcmUgaW5wdXQgYWZ0ZXIgdGhlIGZpcnN0IEZJTklTSDogKi9cbiAgaWYgKHMuc3RhdHVzID09PSBGSU5JU0hfU1RBVEUgJiYgc3RybS5hdmFpbF9pbiAhPT0gMCkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9CVUZfRVJST1IpO1xuICB9XG5cbiAgLyogU3RhcnQgYSBuZXcgYmxvY2sgb3IgY29udGludWUgdGhlIGN1cnJlbnQgb25lLlxuICAgKi9cbiAgaWYgKHN0cm0uYXZhaWxfaW4gIT09IDAgfHwgcy5sb29rYWhlYWQgIT09IDAgfHxcbiAgICAoZmx1c2ggIT09IFpfTk9fRkxVU0ggJiYgcy5zdGF0dXMgIT09IEZJTklTSF9TVEFURSkpIHtcbiAgICB2YXIgYnN0YXRlID0gKHMuc3RyYXRlZ3kgPT09IFpfSFVGRk1BTl9PTkxZKSA/IGRlZmxhdGVfaHVmZihzLCBmbHVzaCkgOlxuICAgICAgKHMuc3RyYXRlZ3kgPT09IFpfUkxFID8gZGVmbGF0ZV9ybGUocywgZmx1c2gpIDpcbiAgICAgICAgY29uZmlndXJhdGlvbl90YWJsZVtzLmxldmVsXS5mdW5jKHMsIGZsdXNoKSk7XG5cbiAgICBpZiAoYnN0YXRlID09PSBCU19GSU5JU0hfU1RBUlRFRCB8fCBic3RhdGUgPT09IEJTX0ZJTklTSF9ET05FKSB7XG4gICAgICBzLnN0YXR1cyA9IEZJTklTSF9TVEFURTtcbiAgICB9XG4gICAgaWYgKGJzdGF0ZSA9PT0gQlNfTkVFRF9NT1JFIHx8IGJzdGF0ZSA9PT0gQlNfRklOSVNIX1NUQVJURUQpIHtcbiAgICAgIGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICBzLmxhc3RfZmx1c2ggPSAtMTtcbiAgICAgICAgLyogYXZvaWQgQlVGX0VSUk9SIG5leHQgY2FsbCwgc2VlIGFib3ZlICovXG4gICAgICB9XG4gICAgICByZXR1cm4gWl9PSztcbiAgICAgIC8qIElmIGZsdXNoICE9IFpfTk9fRkxVU0ggJiYgYXZhaWxfb3V0ID09IDAsIHRoZSBuZXh0IGNhbGxcbiAgICAgICAqIG9mIGRlZmxhdGUgc2hvdWxkIHVzZSB0aGUgc2FtZSBmbHVzaCBwYXJhbWV0ZXIgdG8gbWFrZSBzdXJlXG4gICAgICAgKiB0aGF0IHRoZSBmbHVzaCBpcyBjb21wbGV0ZS4gU28gd2UgZG9uJ3QgaGF2ZSB0byBvdXRwdXQgYW5cbiAgICAgICAqIGVtcHR5IGJsb2NrIGhlcmUsIHRoaXMgd2lsbCBiZSBkb25lIGF0IG5leHQgY2FsbC4gVGhpcyBhbHNvXG4gICAgICAgKiBlbnN1cmVzIHRoYXQgZm9yIGEgdmVyeSBzbWFsbCBvdXRwdXQgYnVmZmVyLCB3ZSBlbWl0IGF0IG1vc3RcbiAgICAgICAqIG9uZSBlbXB0eSBibG9jay5cbiAgICAgICAqL1xuICAgIH1cbiAgICBpZiAoYnN0YXRlID09PSBCU19CTE9DS19ET05FKSB7XG4gICAgICBpZiAoZmx1c2ggPT09IFpfUEFSVElBTF9GTFVTSCkge1xuICAgICAgICB0cmVlcy5fdHJfYWxpZ24ocyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChmbHVzaCAhPT0gWl9CTE9DSykgeyAvKiBGVUxMX0ZMVVNIIG9yIFNZTkNfRkxVU0ggKi9cblxuICAgICAgICB0cmVlcy5fdHJfc3RvcmVkX2Jsb2NrKHMsIDAsIDAsIGZhbHNlKTtcbiAgICAgICAgLyogRm9yIGEgZnVsbCBmbHVzaCwgdGhpcyBlbXB0eSBibG9jayB3aWxsIGJlIHJlY29nbml6ZWRcbiAgICAgICAgICogYXMgYSBzcGVjaWFsIG1hcmtlciBieSBpbmZsYXRlX3N5bmMoKS5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChmbHVzaCA9PT0gWl9GVUxMX0ZMVVNIKSB7XG4gICAgICAgICAgLyoqKiBDTEVBUl9IQVNIKHMpOyAqKiovICAgICAgICAgICAgIC8qIGZvcmdldCBoaXN0b3J5ICovXG4gICAgICAgICAgemVybyhzLmhlYWQpOyAvLyBGaWxsIHdpdGggTklMICg9IDApO1xuXG4gICAgICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICAgICAgICBzLnN0cnN0YXJ0ID0gMDtcbiAgICAgICAgICAgIHMuYmxvY2tfc3RhcnQgPSAwO1xuICAgICAgICAgICAgcy5pbnNlcnQgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICAgIGlmIChzdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICBzLmxhc3RfZmx1c2ggPSAtMTsgLyogYXZvaWQgQlVGX0VSUk9SIGF0IG5leHQgY2FsbCwgc2VlIGFib3ZlICovXG4gICAgICAgIHJldHVybiBaX09LO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL0Fzc2VydChzdHJtLT5hdmFpbF9vdXQgPiAwLCBcImJ1ZzJcIik7XG4gIC8vaWYgKHN0cm0uYXZhaWxfb3V0IDw9IDApIHsgdGhyb3cgbmV3IEVycm9yKFwiYnVnMlwiKTt9XG5cbiAgaWYgKGZsdXNoICE9PSBaX0ZJTklTSCkgeyByZXR1cm4gWl9PSzsgfVxuICBpZiAocy53cmFwIDw9IDApIHsgcmV0dXJuIFpfU1RSRUFNX0VORDsgfVxuXG4gIC8qIFdyaXRlIHRoZSB0cmFpbGVyICovXG4gIGlmIChzLndyYXAgPT09IDIpIHtcbiAgICBwdXRfYnl0ZShzLCBzdHJtLmFkbGVyICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0uYWRsZXIgPj4gOCkgJiAweGZmKTtcbiAgICBwdXRfYnl0ZShzLCAoc3RybS5hZGxlciA+PiAxNikgJiAweGZmKTtcbiAgICBwdXRfYnl0ZShzLCAoc3RybS5hZGxlciA+PiAyNCkgJiAweGZmKTtcbiAgICBwdXRfYnl0ZShzLCBzdHJtLnRvdGFsX2luICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0udG90YWxfaW4gPj4gOCkgJiAweGZmKTtcbiAgICBwdXRfYnl0ZShzLCAoc3RybS50b3RhbF9pbiA+PiAxNikgJiAweGZmKTtcbiAgICBwdXRfYnl0ZShzLCAoc3RybS50b3RhbF9pbiA+PiAyNCkgJiAweGZmKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBwdXRTaG9ydE1TQihzLCBzdHJtLmFkbGVyID4+PiAxNik7XG4gICAgcHV0U2hvcnRNU0Iocywgc3RybS5hZGxlciAmIDB4ZmZmZik7XG4gIH1cblxuICBmbHVzaF9wZW5kaW5nKHN0cm0pO1xuICAvKiBJZiBhdmFpbF9vdXQgaXMgemVybywgdGhlIGFwcGxpY2F0aW9uIHdpbGwgY2FsbCBkZWZsYXRlIGFnYWluXG4gICAqIHRvIGZsdXNoIHRoZSByZXN0LlxuICAgKi9cbiAgaWYgKHMud3JhcCA+IDApIHsgcy53cmFwID0gLXMud3JhcDsgfVxuICAvKiB3cml0ZSB0aGUgdHJhaWxlciBvbmx5IG9uY2UhICovXG4gIHJldHVybiBzLnBlbmRpbmcgIT09IDAgPyBaX09LIDogWl9TVFJFQU1fRU5EO1xufVxuXG5mdW5jdGlvbiBkZWZsYXRlRW5kKHN0cm0pIHtcbiAgdmFyIHN0YXR1cztcblxuICBpZiAoIXN0cm0vKj09IFpfTlVMTCovIHx8ICFzdHJtLnN0YXRlLyo9PSBaX05VTEwqLykge1xuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuXG4gIHN0YXR1cyA9IHN0cm0uc3RhdGUuc3RhdHVzO1xuICBpZiAoc3RhdHVzICE9PSBJTklUX1NUQVRFICYmXG4gICAgc3RhdHVzICE9PSBFWFRSQV9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gTkFNRV9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gQ09NTUVOVF9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gSENSQ19TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gQlVTWV9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gRklOSVNIX1NUQVRFXG4gICkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgc3RybS5zdGF0ZSA9IG51bGw7XG5cbiAgcmV0dXJuIHN0YXR1cyA9PT0gQlVTWV9TVEFURSA/IGVycihzdHJtLCBaX0RBVEFfRVJST1IpIDogWl9PSztcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplcyB0aGUgY29tcHJlc3Npb24gZGljdGlvbmFyeSBmcm9tIHRoZSBnaXZlbiBieXRlXG4gKiBzZXF1ZW5jZSB3aXRob3V0IHByb2R1Y2luZyBhbnkgY29tcHJlc3NlZCBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVTZXREaWN0aW9uYXJ5KHN0cm0sIGRpY3Rpb25hcnkpIHtcbiAgdmFyIGRpY3RMZW5ndGggPSBkaWN0aW9uYXJ5Lmxlbmd0aDtcblxuICB2YXIgcztcbiAgdmFyIHN0ciwgbjtcbiAgdmFyIHdyYXA7XG4gIHZhciBhdmFpbDtcbiAgdmFyIG5leHQ7XG4gIHZhciBpbnB1dDtcbiAgdmFyIHRtcERpY3Q7XG5cbiAgaWYgKCFzdHJtLyo9PSBaX05VTEwqLyB8fCAhc3RybS5zdGF0ZS8qPT0gWl9OVUxMKi8pIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICBzID0gc3RybS5zdGF0ZTtcbiAgd3JhcCA9IHMud3JhcDtcblxuICBpZiAod3JhcCA9PT0gMiB8fCAod3JhcCA9PT0gMSAmJiBzLnN0YXR1cyAhPT0gSU5JVF9TVEFURSkgfHwgcy5sb29rYWhlYWQpIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICAvKiB3aGVuIHVzaW5nIHpsaWIgd3JhcHBlcnMsIGNvbXB1dGUgQWRsZXItMzIgZm9yIHByb3ZpZGVkIGRpY3Rpb25hcnkgKi9cbiAgaWYgKHdyYXAgPT09IDEpIHtcbiAgICAvKiBhZGxlcjMyKHN0cm0tPmFkbGVyLCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKTsgKi9cbiAgICBzdHJtLmFkbGVyID0gYWRsZXIzMihzdHJtLmFkbGVyLCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoLCAwKTtcbiAgfVxuXG4gIHMud3JhcCA9IDA7ICAgLyogYXZvaWQgY29tcHV0aW5nIEFkbGVyLTMyIGluIHJlYWRfYnVmICovXG5cbiAgLyogaWYgZGljdGlvbmFyeSB3b3VsZCBmaWxsIHdpbmRvdywganVzdCByZXBsYWNlIHRoZSBoaXN0b3J5ICovXG4gIGlmIChkaWN0TGVuZ3RoID49IHMud19zaXplKSB7XG4gICAgaWYgKHdyYXAgPT09IDApIHsgICAgICAgICAgICAvKiBhbHJlYWR5IGVtcHR5IG90aGVyd2lzZSAqL1xuICAgICAgLyoqKiBDTEVBUl9IQVNIKHMpOyAqKiovXG4gICAgICB6ZXJvKHMuaGVhZCk7IC8vIEZpbGwgd2l0aCBOSUwgKD0gMCk7XG4gICAgICBzLnN0cnN0YXJ0ID0gMDtcbiAgICAgIHMuYmxvY2tfc3RhcnQgPSAwO1xuICAgICAgcy5pbnNlcnQgPSAwO1xuICAgIH1cbiAgICAvKiB1c2UgdGhlIHRhaWwgKi9cbiAgICAvLyBkaWN0aW9uYXJ5ID0gZGljdGlvbmFyeS5zbGljZShkaWN0TGVuZ3RoIC0gcy53X3NpemUpO1xuICAgIHRtcERpY3QgPSBuZXcgdXRpbHMuQnVmOChzLndfc2l6ZSk7XG4gICAgdXRpbHMuYXJyYXlTZXQodG1wRGljdCwgZGljdGlvbmFyeSwgZGljdExlbmd0aCAtIHMud19zaXplLCBzLndfc2l6ZSwgMCk7XG4gICAgZGljdGlvbmFyeSA9IHRtcERpY3Q7XG4gICAgZGljdExlbmd0aCA9IHMud19zaXplO1xuICB9XG4gIC8qIGluc2VydCBkaWN0aW9uYXJ5IGludG8gd2luZG93IGFuZCBoYXNoICovXG4gIGF2YWlsID0gc3RybS5hdmFpbF9pbjtcbiAgbmV4dCA9IHN0cm0ubmV4dF9pbjtcbiAgaW5wdXQgPSBzdHJtLmlucHV0O1xuICBzdHJtLmF2YWlsX2luID0gZGljdExlbmd0aDtcbiAgc3RybS5uZXh0X2luID0gMDtcbiAgc3RybS5pbnB1dCA9IGRpY3Rpb25hcnk7XG4gIGZpbGxfd2luZG93KHMpO1xuICB3aGlsZSAocy5sb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG4gICAgc3RyID0gcy5zdHJzdGFydDtcbiAgICBuID0gcy5sb29rYWhlYWQgLSAoTUlOX01BVENIIC0gMSk7XG4gICAgZG8ge1xuICAgICAgLyogVVBEQVRFX0hBU0gocywgcy0+aW5zX2gsIHMtPndpbmRvd1tzdHIgKyBNSU5fTUFUQ0gtMV0pOyAqL1xuICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG5cbiAgICAgIHMucHJldltzdHIgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG5cbiAgICAgIHMuaGVhZFtzLmluc19oXSA9IHN0cjtcbiAgICAgIHN0cisrO1xuICAgIH0gd2hpbGUgKC0tbik7XG4gICAgcy5zdHJzdGFydCA9IHN0cjtcbiAgICBzLmxvb2thaGVhZCA9IE1JTl9NQVRDSCAtIDE7XG4gICAgZmlsbF93aW5kb3cocyk7XG4gIH1cbiAgcy5zdHJzdGFydCArPSBzLmxvb2thaGVhZDtcbiAgcy5ibG9ja19zdGFydCA9IHMuc3Ryc3RhcnQ7XG4gIHMuaW5zZXJ0ID0gcy5sb29rYWhlYWQ7XG4gIHMubG9va2FoZWFkID0gMDtcbiAgcy5tYXRjaF9sZW5ndGggPSBzLnByZXZfbGVuZ3RoID0gTUlOX01BVENIIC0gMTtcbiAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICBzdHJtLmlucHV0ID0gaW5wdXQ7XG4gIHN0cm0uYXZhaWxfaW4gPSBhdmFpbDtcbiAgcy53cmFwID0gd3JhcDtcbiAgcmV0dXJuIFpfT0s7XG59XG5cblxuZXhwb3J0cy5kZWZsYXRlSW5pdCA9IGRlZmxhdGVJbml0O1xuZXhwb3J0cy5kZWZsYXRlSW5pdDIgPSBkZWZsYXRlSW5pdDI7XG5leHBvcnRzLmRlZmxhdGVSZXNldCA9IGRlZmxhdGVSZXNldDtcbmV4cG9ydHMuZGVmbGF0ZVJlc2V0S2VlcCA9IGRlZmxhdGVSZXNldEtlZXA7XG5leHBvcnRzLmRlZmxhdGVTZXRIZWFkZXIgPSBkZWZsYXRlU2V0SGVhZGVyO1xuZXhwb3J0cy5kZWZsYXRlID0gZGVmbGF0ZTtcbmV4cG9ydHMuZGVmbGF0ZUVuZCA9IGRlZmxhdGVFbmQ7XG5leHBvcnRzLmRlZmxhdGVTZXREaWN0aW9uYXJ5ID0gZGVmbGF0ZVNldERpY3Rpb25hcnk7XG5leHBvcnRzLmRlZmxhdGVJbmZvID0gJ3Bha28gZGVmbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdCknO1xuXG4vKiBOb3QgaW1wbGVtZW50ZWRcbmV4cG9ydHMuZGVmbGF0ZUJvdW5kID0gZGVmbGF0ZUJvdW5kO1xuZXhwb3J0cy5kZWZsYXRlQ29weSA9IGRlZmxhdGVDb3B5O1xuZXhwb3J0cy5kZWZsYXRlUGFyYW1zID0gZGVmbGF0ZVBhcmFtcztcbmV4cG9ydHMuZGVmbGF0ZVBlbmRpbmcgPSBkZWZsYXRlUGVuZGluZztcbmV4cG9ydHMuZGVmbGF0ZVByaW1lID0gZGVmbGF0ZVByaW1lO1xuZXhwb3J0cy5kZWZsYXRlVHVuZSA9IGRlZmxhdGVUdW5lO1xuKi9cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5mdW5jdGlvbiBHWmhlYWRlcigpIHtcbiAgLyogdHJ1ZSBpZiBjb21wcmVzc2VkIGRhdGEgYmVsaWV2ZWQgdG8gYmUgdGV4dCAqL1xuICB0aGlzLnRleHQgICAgICAgPSAwO1xuICAvKiBtb2RpZmljYXRpb24gdGltZSAqL1xuICB0aGlzLnRpbWUgICAgICAgPSAwO1xuICAvKiBleHRyYSBmbGFncyAobm90IHVzZWQgd2hlbiB3cml0aW5nIGEgZ3ppcCBmaWxlKSAqL1xuICB0aGlzLnhmbGFncyAgICAgPSAwO1xuICAvKiBvcGVyYXRpbmcgc3lzdGVtICovXG4gIHRoaXMub3MgICAgICAgICA9IDA7XG4gIC8qIHBvaW50ZXIgdG8gZXh0cmEgZmllbGQgb3IgWl9OVUxMIGlmIG5vbmUgKi9cbiAgdGhpcy5leHRyYSAgICAgID0gbnVsbDtcbiAgLyogZXh0cmEgZmllbGQgbGVuZ3RoICh2YWxpZCBpZiBleHRyYSAhPSBaX05VTEwpICovXG4gIHRoaXMuZXh0cmFfbGVuICA9IDA7IC8vIEFjdHVhbGx5LCB3ZSBkb24ndCBuZWVkIGl0IGluIEpTLFxuICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgbGVhdmUgZm9yIGZldyBjb2RlIG1vZGlmaWNhdGlvbnNcblxuICAvL1xuICAvLyBTZXR1cCBsaW1pdHMgaXMgbm90IG5lY2Vzc2FyeSBiZWNhdXNlIGluIGpzIHdlIHNob3VsZCBub3QgcHJlYWxsb2NhdGUgbWVtb3J5XG4gIC8vIGZvciBpbmZsYXRlIHVzZSBjb25zdGFudCBsaW1pdCBpbiA2NTUzNiBieXRlc1xuICAvL1xuXG4gIC8qIHNwYWNlIGF0IGV4dHJhIChvbmx5IHdoZW4gcmVhZGluZyBoZWFkZXIpICovXG4gIC8vIHRoaXMuZXh0cmFfbWF4ICA9IDA7XG4gIC8qIHBvaW50ZXIgdG8gemVyby10ZXJtaW5hdGVkIGZpbGUgbmFtZSBvciBaX05VTEwgKi9cbiAgdGhpcy5uYW1lICAgICAgID0gJyc7XG4gIC8qIHNwYWNlIGF0IG5hbWUgKG9ubHkgd2hlbiByZWFkaW5nIGhlYWRlcikgKi9cbiAgLy8gdGhpcy5uYW1lX21heCAgID0gMDtcbiAgLyogcG9pbnRlciB0byB6ZXJvLXRlcm1pbmF0ZWQgY29tbWVudCBvciBaX05VTEwgKi9cbiAgdGhpcy5jb21tZW50ICAgID0gJyc7XG4gIC8qIHNwYWNlIGF0IGNvbW1lbnQgKG9ubHkgd2hlbiByZWFkaW5nIGhlYWRlcikgKi9cbiAgLy8gdGhpcy5jb21tX21heCAgID0gMDtcbiAgLyogdHJ1ZSBpZiB0aGVyZSB3YXMgb3Igd2lsbCBiZSBhIGhlYWRlciBjcmMgKi9cbiAgdGhpcy5oY3JjICAgICAgID0gMDtcbiAgLyogdHJ1ZSB3aGVuIGRvbmUgcmVhZGluZyBnemlwIGhlYWRlciAobm90IHVzZWQgd2hlbiB3cml0aW5nIGEgZ3ppcCBmaWxlKSAqL1xuICB0aGlzLmRvbmUgICAgICAgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHWmhlYWRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG4vLyBTZWUgc3RhdGUgZGVmcyBmcm9tIGluZmxhdGUuanNcbnZhciBCQUQgPSAzMDsgICAgICAgLyogZ290IGEgZGF0YSBlcnJvciAtLSByZW1haW4gaGVyZSB1bnRpbCByZXNldCAqL1xudmFyIFRZUEUgPSAxMjsgICAgICAvKiBpOiB3YWl0aW5nIGZvciB0eXBlIGJpdHMsIGluY2x1ZGluZyBsYXN0LWZsYWcgYml0ICovXG5cbi8qXG4gICBEZWNvZGUgbGl0ZXJhbCwgbGVuZ3RoLCBhbmQgZGlzdGFuY2UgY29kZXMgYW5kIHdyaXRlIG91dCB0aGUgcmVzdWx0aW5nXG4gICBsaXRlcmFsIGFuZCBtYXRjaCBieXRlcyB1bnRpbCBlaXRoZXIgbm90IGVub3VnaCBpbnB1dCBvciBvdXRwdXQgaXNcbiAgIGF2YWlsYWJsZSwgYW4gZW5kLW9mLWJsb2NrIGlzIGVuY291bnRlcmVkLCBvciBhIGRhdGEgZXJyb3IgaXMgZW5jb3VudGVyZWQuXG4gICBXaGVuIGxhcmdlIGVub3VnaCBpbnB1dCBhbmQgb3V0cHV0IGJ1ZmZlcnMgYXJlIHN1cHBsaWVkIHRvIGluZmxhdGUoKSwgZm9yXG4gICBleGFtcGxlLCBhIDE2SyBpbnB1dCBidWZmZXIgYW5kIGEgNjRLIG91dHB1dCBidWZmZXIsIG1vcmUgdGhhbiA5NSUgb2YgdGhlXG4gICBpbmZsYXRlIGV4ZWN1dGlvbiB0aW1lIGlzIHNwZW50IGluIHRoaXMgcm91dGluZS5cblxuICAgRW50cnkgYXNzdW1wdGlvbnM6XG5cbiAgICAgICAgc3RhdGUubW9kZSA9PT0gTEVOXG4gICAgICAgIHN0cm0uYXZhaWxfaW4gPj0gNlxuICAgICAgICBzdHJtLmF2YWlsX291dCA+PSAyNThcbiAgICAgICAgc3RhcnQgPj0gc3RybS5hdmFpbF9vdXRcbiAgICAgICAgc3RhdGUuYml0cyA8IDhcblxuICAgT24gcmV0dXJuLCBzdGF0ZS5tb2RlIGlzIG9uZSBvZjpcblxuICAgICAgICBMRU4gLS0gcmFuIG91dCBvZiBlbm91Z2ggb3V0cHV0IHNwYWNlIG9yIGVub3VnaCBhdmFpbGFibGUgaW5wdXRcbiAgICAgICAgVFlQRSAtLSByZWFjaGVkIGVuZCBvZiBibG9jayBjb2RlLCBpbmZsYXRlKCkgdG8gaW50ZXJwcmV0IG5leHQgYmxvY2tcbiAgICAgICAgQkFEIC0tIGVycm9yIGluIGJsb2NrIGRhdGFcblxuICAgTm90ZXM6XG5cbiAgICAtIFRoZSBtYXhpbXVtIGlucHV0IGJpdHMgdXNlZCBieSBhIGxlbmd0aC9kaXN0YW5jZSBwYWlyIGlzIDE1IGJpdHMgZm9yIHRoZVxuICAgICAgbGVuZ3RoIGNvZGUsIDUgYml0cyBmb3IgdGhlIGxlbmd0aCBleHRyYSwgMTUgYml0cyBmb3IgdGhlIGRpc3RhbmNlIGNvZGUsXG4gICAgICBhbmQgMTMgYml0cyBmb3IgdGhlIGRpc3RhbmNlIGV4dHJhLiAgVGhpcyB0b3RhbHMgNDggYml0cywgb3Igc2l4IGJ5dGVzLlxuICAgICAgVGhlcmVmb3JlIGlmIHN0cm0uYXZhaWxfaW4gPj0gNiwgdGhlbiB0aGVyZSBpcyBlbm91Z2ggaW5wdXQgdG8gYXZvaWRcbiAgICAgIGNoZWNraW5nIGZvciBhdmFpbGFibGUgaW5wdXQgd2hpbGUgZGVjb2RpbmcuXG5cbiAgICAtIFRoZSBtYXhpbXVtIGJ5dGVzIHRoYXQgYSBzaW5nbGUgbGVuZ3RoL2Rpc3RhbmNlIHBhaXIgY2FuIG91dHB1dCBpcyAyNThcbiAgICAgIGJ5dGVzLCB3aGljaCBpcyB0aGUgbWF4aW11bSBsZW5ndGggdGhhdCBjYW4gYmUgY29kZWQuICBpbmZsYXRlX2Zhc3QoKVxuICAgICAgcmVxdWlyZXMgc3RybS5hdmFpbF9vdXQgPj0gMjU4IGZvciBlYWNoIGxvb3AgdG8gYXZvaWQgY2hlY2tpbmcgZm9yXG4gICAgICBvdXRwdXQgc3BhY2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5mbGF0ZV9mYXN0KHN0cm0sIHN0YXJ0KSB7XG4gIHZhciBzdGF0ZTtcbiAgdmFyIF9pbjsgICAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0uaW5wdXQgKi9cbiAgdmFyIGxhc3Q7ICAgICAgICAgICAgICAgICAgIC8qIGhhdmUgZW5vdWdoIGlucHV0IHdoaWxlIGluIDwgbGFzdCAqL1xuICB2YXIgX291dDsgICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5vdXRwdXQgKi9cbiAgdmFyIGJlZzsgICAgICAgICAgICAgICAgICAgIC8qIGluZmxhdGUoKSdzIGluaXRpYWwgc3RybS5vdXRwdXQgKi9cbiAgdmFyIGVuZDsgICAgICAgICAgICAgICAgICAgIC8qIHdoaWxlIG91dCA8IGVuZCwgZW5vdWdoIHNwYWNlIGF2YWlsYWJsZSAqL1xuLy8jaWZkZWYgSU5GTEFURV9TVFJJQ1RcbiAgdmFyIGRtYXg7ICAgICAgICAgICAgICAgICAgIC8qIG1heGltdW0gZGlzdGFuY2UgZnJvbSB6bGliIGhlYWRlciAqL1xuLy8jZW5kaWZcbiAgdmFyIHdzaXplOyAgICAgICAgICAgICAgICAgIC8qIHdpbmRvdyBzaXplIG9yIHplcm8gaWYgbm90IHVzaW5nIHdpbmRvdyAqL1xuICB2YXIgd2hhdmU7ICAgICAgICAgICAgICAgICAgLyogdmFsaWQgYnl0ZXMgaW4gdGhlIHdpbmRvdyAqL1xuICB2YXIgd25leHQ7ICAgICAgICAgICAgICAgICAgLyogd2luZG93IHdyaXRlIGluZGV4ICovXG4gIC8vIFVzZSBgc193aW5kb3dgIGluc3RlYWQgYHdpbmRvd2AsIGF2b2lkIGNvbmZsaWN0IHdpdGggaW5zdHJ1bWVudGF0aW9uIHRvb2xzXG4gIHZhciBzX3dpbmRvdzsgICAgICAgICAgICAgICAvKiBhbGxvY2F0ZWQgc2xpZGluZyB3aW5kb3csIGlmIHdzaXplICE9IDAgKi9cbiAgdmFyIGhvbGQ7ICAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0uaG9sZCAqL1xuICB2YXIgYml0czsgICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5iaXRzICovXG4gIHZhciBsY29kZTsgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLmxlbmNvZGUgKi9cbiAgdmFyIGRjb2RlOyAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0uZGlzdGNvZGUgKi9cbiAgdmFyIGxtYXNrOyAgICAgICAgICAgICAgICAgIC8qIG1hc2sgZm9yIGZpcnN0IGxldmVsIG9mIGxlbmd0aCBjb2RlcyAqL1xuICB2YXIgZG1hc2s7ICAgICAgICAgICAgICAgICAgLyogbWFzayBmb3IgZmlyc3QgbGV2ZWwgb2YgZGlzdGFuY2UgY29kZXMgKi9cbiAgdmFyIGhlcmU7ICAgICAgICAgICAgICAgICAgIC8qIHJldHJpZXZlZCB0YWJsZSBlbnRyeSAqL1xuICB2YXIgb3A7ICAgICAgICAgICAgICAgICAgICAgLyogY29kZSBiaXRzLCBvcGVyYXRpb24sIGV4dHJhIGJpdHMsIG9yICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgd2luZG93IHBvc2l0aW9uLCB3aW5kb3cgYnl0ZXMgdG8gY29weSAqL1xuICB2YXIgbGVuOyAgICAgICAgICAgICAgICAgICAgLyogbWF0Y2ggbGVuZ3RoLCB1bnVzZWQgYnl0ZXMgKi9cbiAgdmFyIGRpc3Q7ICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoIGRpc3RhbmNlICovXG4gIHZhciBmcm9tOyAgICAgICAgICAgICAgICAgICAvKiB3aGVyZSB0byBjb3B5IG1hdGNoIGZyb20gKi9cbiAgdmFyIGZyb21fc291cmNlO1xuXG5cbiAgdmFyIGlucHV0LCBvdXRwdXQ7IC8vIEpTIHNwZWNpZmljLCBiZWNhdXNlIHdlIGhhdmUgbm8gcG9pbnRlcnNcblxuICAvKiBjb3B5IHN0YXRlIHRvIGxvY2FsIHZhcmlhYmxlcyAqL1xuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG4gIC8vaGVyZSA9IHN0YXRlLmhlcmU7XG4gIF9pbiA9IHN0cm0ubmV4dF9pbjtcbiAgaW5wdXQgPSBzdHJtLmlucHV0O1xuICBsYXN0ID0gX2luICsgKHN0cm0uYXZhaWxfaW4gLSA1KTtcbiAgX291dCA9IHN0cm0ubmV4dF9vdXQ7XG4gIG91dHB1dCA9IHN0cm0ub3V0cHV0O1xuICBiZWcgPSBfb3V0IC0gKHN0YXJ0IC0gc3RybS5hdmFpbF9vdXQpO1xuICBlbmQgPSBfb3V0ICsgKHN0cm0uYXZhaWxfb3V0IC0gMjU3KTtcbi8vI2lmZGVmIElORkxBVEVfU1RSSUNUXG4gIGRtYXggPSBzdGF0ZS5kbWF4O1xuLy8jZW5kaWZcbiAgd3NpemUgPSBzdGF0ZS53c2l6ZTtcbiAgd2hhdmUgPSBzdGF0ZS53aGF2ZTtcbiAgd25leHQgPSBzdGF0ZS53bmV4dDtcbiAgc193aW5kb3cgPSBzdGF0ZS53aW5kb3c7XG4gIGhvbGQgPSBzdGF0ZS5ob2xkO1xuICBiaXRzID0gc3RhdGUuYml0cztcbiAgbGNvZGUgPSBzdGF0ZS5sZW5jb2RlO1xuICBkY29kZSA9IHN0YXRlLmRpc3Rjb2RlO1xuICBsbWFzayA9ICgxIDw8IHN0YXRlLmxlbmJpdHMpIC0gMTtcbiAgZG1hc2sgPSAoMSA8PCBzdGF0ZS5kaXN0Yml0cykgLSAxO1xuXG5cbiAgLyogZGVjb2RlIGxpdGVyYWxzIGFuZCBsZW5ndGgvZGlzdGFuY2VzIHVudGlsIGVuZC1vZi1ibG9jayBvciBub3QgZW5vdWdoXG4gICAgIGlucHV0IGRhdGEgb3Igb3V0cHV0IHNwYWNlICovXG5cbiAgdG9wOlxuICBkbyB7XG4gICAgaWYgKGJpdHMgPCAxNSkge1xuICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgIGJpdHMgKz0gODtcbiAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICBiaXRzICs9IDg7XG4gICAgfVxuXG4gICAgaGVyZSA9IGxjb2RlW2hvbGQgJiBsbWFza107XG5cbiAgICBkb2xlbjpcbiAgICBmb3IgKDs7KSB7IC8vIEdvdG8gZW11bGF0aW9uXG4gICAgICBvcCA9IGhlcmUgPj4+IDI0LypoZXJlLmJpdHMqLztcbiAgICAgIGhvbGQgPj4+PSBvcDtcbiAgICAgIGJpdHMgLT0gb3A7XG4gICAgICBvcCA9IChoZXJlID4+PiAxNikgJiAweGZmLypoZXJlLm9wKi87XG4gICAgICBpZiAob3AgPT09IDApIHsgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGxpdGVyYWwgKi9cbiAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIGhlcmUudmFsID49IDB4MjAgJiYgaGVyZS52YWwgPCAweDdmID9cbiAgICAgICAgLy8gICAgICAgIFwiaW5mbGF0ZTogICAgICAgICBsaXRlcmFsICclYydcXG5cIiA6XG4gICAgICAgIC8vICAgICAgICBcImluZmxhdGU6ICAgICAgICAgbGl0ZXJhbCAweCUwMnhcXG5cIiwgaGVyZS52YWwpKTtcbiAgICAgICAgb3V0cHV0W19vdXQrK10gPSBoZXJlICYgMHhmZmZmLypoZXJlLnZhbCovO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3AgJiAxNikgeyAgICAgICAgICAgICAgICAgICAgIC8qIGxlbmd0aCBiYXNlICovXG4gICAgICAgIGxlbiA9IGhlcmUgJiAweGZmZmYvKmhlcmUudmFsKi87XG4gICAgICAgIG9wICY9IDE1OyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBleHRyYSBiaXRzICovXG4gICAgICAgIGlmIChvcCkge1xuICAgICAgICAgIGlmIChiaXRzIDwgb3ApIHtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxlbiArPSBob2xkICYgKCgxIDw8IG9wKSAtIDEpO1xuICAgICAgICAgIGhvbGQgPj4+PSBvcDtcbiAgICAgICAgICBiaXRzIC09IG9wO1xuICAgICAgICB9XG4gICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgICAgbGVuZ3RoICV1XFxuXCIsIGxlbikpO1xuICAgICAgICBpZiAoYml0cyA8IDE1KSB7XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgIH1cbiAgICAgICAgaGVyZSA9IGRjb2RlW2hvbGQgJiBkbWFza107XG5cbiAgICAgICAgZG9kaXN0OlxuICAgICAgICBmb3IgKDs7KSB7IC8vIGdvdG8gZW11bGF0aW9uXG4gICAgICAgICAgb3AgPSBoZXJlID4+PiAyNC8qaGVyZS5iaXRzKi87XG4gICAgICAgICAgaG9sZCA+Pj49IG9wO1xuICAgICAgICAgIGJpdHMgLT0gb3A7XG4gICAgICAgICAgb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZi8qaGVyZS5vcCovO1xuXG4gICAgICAgICAgaWYgKG9wICYgMTYpIHsgICAgICAgICAgICAgICAgICAgICAgLyogZGlzdGFuY2UgYmFzZSAqL1xuICAgICAgICAgICAgZGlzdCA9IGhlcmUgJiAweGZmZmYvKmhlcmUudmFsKi87XG4gICAgICAgICAgICBvcCAmPSAxNTsgICAgICAgICAgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBleHRyYSBiaXRzICovXG4gICAgICAgICAgICBpZiAoYml0cyA8IG9wKSB7XG4gICAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgICAgaWYgKGJpdHMgPCBvcCkge1xuICAgICAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbX2luKytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXN0ICs9IGhvbGQgJiAoKDEgPDwgb3ApIC0gMSk7XG4vLyNpZmRlZiBJTkZMQVRFX1NUUklDVFxuICAgICAgICAgICAgaWYgKGRpc3QgPiBkbWF4KSB7XG4gICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgICAgYnJlYWsgdG9wO1xuICAgICAgICAgICAgfVxuLy8jZW5kaWZcbiAgICAgICAgICAgIGhvbGQgPj4+PSBvcDtcbiAgICAgICAgICAgIGJpdHMgLT0gb3A7XG4gICAgICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGRpc3RhbmNlICV1XFxuXCIsIGRpc3QpKTtcbiAgICAgICAgICAgIG9wID0gX291dCAtIGJlZzsgICAgICAgICAgICAgICAgLyogbWF4IGRpc3RhbmNlIGluIG91dHB1dCAqL1xuICAgICAgICAgICAgaWYgKGRpc3QgPiBvcCkgeyAgICAgICAgICAgICAgICAvKiBzZWUgaWYgY29weSBmcm9tIHdpbmRvdyAqL1xuICAgICAgICAgICAgICBvcCA9IGRpc3QgLSBvcDsgICAgICAgICAgICAgICAvKiBkaXN0YW5jZSBiYWNrIGluIHdpbmRvdyAqL1xuICAgICAgICAgICAgICBpZiAob3AgPiB3aGF2ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5zYW5lKSB7XG4gICAgICAgICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjayc7XG4gICAgICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICAgICAgYnJlYWsgdG9wO1xuICAgICAgICAgICAgICAgIH1cblxuLy8gKCEpIFRoaXMgYmxvY2sgaXMgZGlzYWJsZWQgaW4gemxpYiBkZWZhdWx0cyxcbi8vIGRvbid0IGVuYWJsZSBpdCBmb3IgYmluYXJ5IGNvbXBhdGliaWxpdHlcbi8vI2lmZGVmIElORkxBVEVfQUxMT1dfSU5WQUxJRF9ESVNUQU5DRV9UT09GQVJfQVJSUlxuLy8gICAgICAgICAgICAgICAgaWYgKGxlbiA8PSBvcCAtIHdoYXZlKSB7XG4vLyAgICAgICAgICAgICAgICAgIGRvIHtcbi8vICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IDA7XG4vLyAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tbGVuKTtcbi8vICAgICAgICAgICAgICAgICAgY29udGludWUgdG9wO1xuLy8gICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgbGVuIC09IG9wIC0gd2hhdmU7XG4vLyAgICAgICAgICAgICAgICBkbyB7XG4vLyAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gMDtcbi8vICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tb3AgPiB3aGF2ZSk7XG4vLyAgICAgICAgICAgICAgICBpZiAob3AgPT09IDApIHtcbi8vICAgICAgICAgICAgICAgICAgZnJvbSA9IF9vdXQgLSBkaXN0O1xuLy8gICAgICAgICAgICAgICAgICBkbyB7XG4vLyAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbi8vICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1sZW4pO1xuLy8gICAgICAgICAgICAgICAgICBjb250aW51ZSB0b3A7XG4vLyAgICAgICAgICAgICAgICB9XG4vLyNlbmRpZlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGZyb20gPSAwOyAvLyB3aW5kb3cgaW5kZXhcbiAgICAgICAgICAgICAgZnJvbV9zb3VyY2UgPSBzX3dpbmRvdztcbiAgICAgICAgICAgICAgaWYgKHduZXh0ID09PSAwKSB7ICAgICAgICAgICAvKiB2ZXJ5IGNvbW1vbiBjYXNlICovXG4gICAgICAgICAgICAgICAgZnJvbSArPSB3c2l6ZSAtIG9wO1xuICAgICAgICAgICAgICAgIGlmIChvcCA8IGxlbikgeyAgICAgICAgIC8qIHNvbWUgZnJvbSB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICAgIGxlbiAtPSBvcDtcbiAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBzX3dpbmRvd1tmcm9tKytdO1xuICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1vcCk7XG4gICAgICAgICAgICAgICAgICBmcm9tID0gX291dCAtIGRpc3Q7ICAvKiByZXN0IGZyb20gb3V0cHV0ICovXG4gICAgICAgICAgICAgICAgICBmcm9tX3NvdXJjZSA9IG91dHB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAod25leHQgPCBvcCkgeyAgICAgIC8qIHdyYXAgYXJvdW5kIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgIGZyb20gKz0gd3NpemUgKyB3bmV4dCAtIG9wO1xuICAgICAgICAgICAgICAgIG9wIC09IHduZXh0O1xuICAgICAgICAgICAgICAgIGlmIChvcCA8IGxlbikgeyAgICAgICAgIC8qIHNvbWUgZnJvbSBlbmQgb2Ygd2luZG93ICovXG4gICAgICAgICAgICAgICAgICBsZW4gLT0gb3A7XG4gICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gc193aW5kb3dbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tb3ApO1xuICAgICAgICAgICAgICAgICAgZnJvbSA9IDA7XG4gICAgICAgICAgICAgICAgICBpZiAod25leHQgPCBsZW4pIHsgIC8qIHNvbWUgZnJvbSBzdGFydCBvZiB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICAgICAgb3AgPSB3bmV4dDtcbiAgICAgICAgICAgICAgICAgICAgbGVuIC09IG9wO1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBzX3dpbmRvd1tmcm9tKytdO1xuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLW9wKTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbSA9IF9vdXQgLSBkaXN0OyAgICAgIC8qIHJlc3QgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICAgICAgICAgICAgZnJvbV9zb3VyY2UgPSBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAvKiBjb250aWd1b3VzIGluIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgIGZyb20gKz0gd25leHQgLSBvcDtcbiAgICAgICAgICAgICAgICBpZiAob3AgPCBsZW4pIHsgICAgICAgICAvKiBzb21lIGZyb20gd2luZG93ICovXG4gICAgICAgICAgICAgICAgICBsZW4gLT0gb3A7XG4gICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gc193aW5kb3dbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tb3ApO1xuICAgICAgICAgICAgICAgICAgZnJvbSA9IF9vdXQgLSBkaXN0OyAgLyogcmVzdCBmcm9tIG91dHB1dCAqL1xuICAgICAgICAgICAgICAgICAgZnJvbV9zb3VyY2UgPSBvdXRwdXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHdoaWxlIChsZW4gPiAyKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IGZyb21fc291cmNlW2Zyb20rK107XG4gICAgICAgICAgICAgICAgbGVuIC09IDM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGxlbikge1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMSkge1xuICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGZyb20gPSBfb3V0IC0gZGlzdDsgICAgICAgICAgLyogY29weSBkaXJlY3QgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICAgICAgZG8geyAgICAgICAgICAgICAgICAgICAgICAgIC8qIG1pbmltdW0gbGVuZ3RoIGlzIHRocmVlICovXG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4gICAgICAgICAgICAgICAgbGVuIC09IDM7XG4gICAgICAgICAgICAgIH0gd2hpbGUgKGxlbiA+IDIpO1xuICAgICAgICAgICAgICBpZiAobGVuKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMSkge1xuICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoKG9wICYgNjQpID09PSAwKSB7ICAgICAgICAgIC8qIDJuZCBsZXZlbCBkaXN0YW5jZSBjb2RlICovXG4gICAgICAgICAgICBoZXJlID0gZGNvZGVbKGhlcmUgJiAweGZmZmYpLypoZXJlLnZhbCovICsgKGhvbGQgJiAoKDEgPDwgb3ApIC0gMSkpXTtcbiAgICAgICAgICAgIGNvbnRpbnVlIGRvZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGRpc3RhbmNlIGNvZGUnO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrIHRvcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhazsgLy8gbmVlZCB0byBlbXVsYXRlIGdvdG8gdmlhIFwiY29udGludWVcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgob3AgJiA2NCkgPT09IDApIHsgICAgICAgICAgICAgIC8qIDJuZCBsZXZlbCBsZW5ndGggY29kZSAqL1xuICAgICAgICBoZXJlID0gbGNvZGVbKGhlcmUgJiAweGZmZmYpLypoZXJlLnZhbCovICsgKGhvbGQgJiAoKDEgPDwgb3ApIC0gMSkpXTtcbiAgICAgICAgY29udGludWUgZG9sZW47XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcCAmIDMyKSB7ICAgICAgICAgICAgICAgICAgICAgLyogZW5kLW9mLWJsb2NrICovXG4gICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgICAgZW5kIG9mIGJsb2NrXFxuXCIpKTtcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIGJyZWFrIHRvcDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUnO1xuICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICBicmVhayB0b3A7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrOyAvLyBuZWVkIHRvIGVtdWxhdGUgZ290byB2aWEgXCJjb250aW51ZVwiXG4gICAgfVxuICB9IHdoaWxlIChfaW4gPCBsYXN0ICYmIF9vdXQgPCBlbmQpO1xuXG4gIC8qIHJldHVybiB1bnVzZWQgYnl0ZXMgKG9uIGVudHJ5LCBiaXRzIDwgOCwgc28gaW4gd29uJ3QgZ28gdG9vIGZhciBiYWNrKSAqL1xuICBsZW4gPSBiaXRzID4+IDM7XG4gIF9pbiAtPSBsZW47XG4gIGJpdHMgLT0gbGVuIDw8IDM7XG4gIGhvbGQgJj0gKDEgPDwgYml0cykgLSAxO1xuXG4gIC8qIHVwZGF0ZSBzdGF0ZSBhbmQgcmV0dXJuICovXG4gIHN0cm0ubmV4dF9pbiA9IF9pbjtcbiAgc3RybS5uZXh0X291dCA9IF9vdXQ7XG4gIHN0cm0uYXZhaWxfaW4gPSAoX2luIDwgbGFzdCA/IDUgKyAobGFzdCAtIF9pbikgOiA1IC0gKF9pbiAtIGxhc3QpKTtcbiAgc3RybS5hdmFpbF9vdXQgPSAoX291dCA8IGVuZCA/IDI1NyArIChlbmQgLSBfb3V0KSA6IDI1NyAtIChfb3V0IC0gZW5kKSk7XG4gIHN0YXRlLmhvbGQgPSBob2xkO1xuICBzdGF0ZS5iaXRzID0gYml0cztcbiAgcmV0dXJuO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG52YXIgdXRpbHMgICAgICAgICA9IHJlcXVpcmUoJy4uL3V0aWxzL2NvbW1vbicpO1xudmFyIGFkbGVyMzIgICAgICAgPSByZXF1aXJlKCcuL2FkbGVyMzInKTtcbnZhciBjcmMzMiAgICAgICAgID0gcmVxdWlyZSgnLi9jcmMzMicpO1xudmFyIGluZmxhdGVfZmFzdCAgPSByZXF1aXJlKCcuL2luZmZhc3QnKTtcbnZhciBpbmZsYXRlX3RhYmxlID0gcmVxdWlyZSgnLi9pbmZ0cmVlcycpO1xuXG52YXIgQ09ERVMgPSAwO1xudmFyIExFTlMgPSAxO1xudmFyIERJU1RTID0gMjtcblxuLyogUHVibGljIGNvbnN0YW50cyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuLyogQWxsb3dlZCBmbHVzaCB2YWx1ZXM7IHNlZSBkZWZsYXRlKCkgYW5kIGluZmxhdGUoKSBiZWxvdyBmb3IgZGV0YWlscyAqL1xuLy92YXIgWl9OT19GTFVTSCAgICAgID0gMDtcbi8vdmFyIFpfUEFSVElBTF9GTFVTSCA9IDE7XG4vL3ZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xuLy92YXIgWl9GVUxMX0ZMVVNIICAgID0gMztcbnZhciBaX0ZJTklTSCAgICAgICAgPSA0O1xudmFyIFpfQkxPQ0sgICAgICAgICA9IDU7XG52YXIgWl9UUkVFUyAgICAgICAgID0gNjtcblxuXG4vKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gKiBhcmUgZXJyb3JzLCBwb3NpdGl2ZSB2YWx1ZXMgYXJlIHVzZWQgZm9yIHNwZWNpYWwgYnV0IG5vcm1hbCBldmVudHMuXG4gKi9cbnZhciBaX09LICAgICAgICAgICAgPSAwO1xudmFyIFpfU1RSRUFNX0VORCAgICA9IDE7XG52YXIgWl9ORUVEX0RJQ1QgICAgID0gMjtcbi8vdmFyIFpfRVJSTk8gICAgICAgICA9IC0xO1xudmFyIFpfU1RSRUFNX0VSUk9SICA9IC0yO1xudmFyIFpfREFUQV9FUlJPUiAgICA9IC0zO1xudmFyIFpfTUVNX0VSUk9SICAgICA9IC00O1xudmFyIFpfQlVGX0VSUk9SICAgICA9IC01O1xuLy92YXIgWl9WRVJTSU9OX0VSUk9SID0gLTY7XG5cbi8qIFRoZSBkZWZsYXRlIGNvbXByZXNzaW9uIG1ldGhvZCAqL1xudmFyIFpfREVGTEFURUQgID0gODtcblxuXG4vKiBTVEFURVMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG52YXIgICAgSEVBRCA9IDE7ICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIG1hZ2ljIGhlYWRlciAqL1xudmFyICAgIEZMQUdTID0gMjsgICAgICAvKiBpOiB3YWl0aW5nIGZvciBtZXRob2QgYW5kIGZsYWdzIChnemlwKSAqL1xudmFyICAgIFRJTUUgPSAzOyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBtb2RpZmljYXRpb24gdGltZSAoZ3ppcCkgKi9cbnZhciAgICBPUyA9IDQ7ICAgICAgICAgLyogaTogd2FpdGluZyBmb3IgZXh0cmEgZmxhZ3MgYW5kIG9wZXJhdGluZyBzeXN0ZW0gKGd6aXApICovXG52YXIgICAgRVhMRU4gPSA1OyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGV4dHJhIGxlbmd0aCAoZ3ppcCkgKi9cbnZhciAgICBFWFRSQSA9IDY7ICAgICAgLyogaTogd2FpdGluZyBmb3IgZXh0cmEgYnl0ZXMgKGd6aXApICovXG52YXIgICAgTkFNRSA9IDc7ICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGVuZCBvZiBmaWxlIG5hbWUgKGd6aXApICovXG52YXIgICAgQ09NTUVOVCA9IDg7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIGVuZCBvZiBjb21tZW50IChnemlwKSAqL1xudmFyICAgIEhDUkMgPSA5OyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBoZWFkZXIgY3JjIChnemlwKSAqL1xudmFyICAgIERJQ1RJRCA9IDEwOyAgICAvKiBpOiB3YWl0aW5nIGZvciBkaWN0aW9uYXJ5IGNoZWNrIHZhbHVlICovXG52YXIgICAgRElDVCA9IDExOyAgICAgIC8qIHdhaXRpbmcgZm9yIGluZmxhdGVTZXREaWN0aW9uYXJ5KCkgY2FsbCAqL1xudmFyICAgICAgICBUWVBFID0gMTI7ICAgICAgLyogaTogd2FpdGluZyBmb3IgdHlwZSBiaXRzLCBpbmNsdWRpbmcgbGFzdC1mbGFnIGJpdCAqL1xudmFyICAgICAgICBUWVBFRE8gPSAxMzsgICAgLyogaTogc2FtZSwgYnV0IHNraXAgY2hlY2sgdG8gZXhpdCBpbmZsYXRlIG9uIG5ldyBibG9jayAqL1xudmFyICAgICAgICBTVE9SRUQgPSAxNDsgICAgLyogaTogd2FpdGluZyBmb3Igc3RvcmVkIHNpemUgKGxlbmd0aCBhbmQgY29tcGxlbWVudCkgKi9cbnZhciAgICAgICAgQ09QWV8gPSAxNTsgICAgIC8qIGkvbzogc2FtZSBhcyBDT1BZIGJlbG93LCBidXQgb25seSBmaXJzdCB0aW1lIGluICovXG52YXIgICAgICAgIENPUFkgPSAxNjsgICAgICAvKiBpL286IHdhaXRpbmcgZm9yIGlucHV0IG9yIG91dHB1dCB0byBjb3B5IHN0b3JlZCBibG9jayAqL1xudmFyICAgICAgICBUQUJMRSA9IDE3OyAgICAgLyogaTogd2FpdGluZyBmb3IgZHluYW1pYyBibG9jayB0YWJsZSBsZW5ndGhzICovXG52YXIgICAgICAgIExFTkxFTlMgPSAxODsgICAvKiBpOiB3YWl0aW5nIGZvciBjb2RlIGxlbmd0aCBjb2RlIGxlbmd0aHMgKi9cbnZhciAgICAgICAgQ09ERUxFTlMgPSAxOTsgIC8qIGk6IHdhaXRpbmcgZm9yIGxlbmd0aC9saXQgYW5kIGRpc3RhbmNlIGNvZGUgbGVuZ3RocyAqL1xudmFyICAgICAgICAgICAgTEVOXyA9IDIwOyAgICAgIC8qIGk6IHNhbWUgYXMgTEVOIGJlbG93LCBidXQgb25seSBmaXJzdCB0aW1lIGluICovXG52YXIgICAgICAgICAgICBMRU4gPSAyMTsgICAgICAgLyogaTogd2FpdGluZyBmb3IgbGVuZ3RoL2xpdC9lb2IgY29kZSAqL1xudmFyICAgICAgICAgICAgTEVORVhUID0gMjI7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIGxlbmd0aCBleHRyYSBiaXRzICovXG52YXIgICAgICAgICAgICBESVNUID0gMjM7ICAgICAgLyogaTogd2FpdGluZyBmb3IgZGlzdGFuY2UgY29kZSAqL1xudmFyICAgICAgICAgICAgRElTVEVYVCA9IDI0OyAgIC8qIGk6IHdhaXRpbmcgZm9yIGRpc3RhbmNlIGV4dHJhIGJpdHMgKi9cbnZhciAgICAgICAgICAgIE1BVENIID0gMjU7ICAgICAvKiBvOiB3YWl0aW5nIGZvciBvdXRwdXQgc3BhY2UgdG8gY29weSBzdHJpbmcgKi9cbnZhciAgICAgICAgICAgIExJVCA9IDI2OyAgICAgICAvKiBvOiB3YWl0aW5nIGZvciBvdXRwdXQgc3BhY2UgdG8gd3JpdGUgbGl0ZXJhbCAqL1xudmFyICAgIENIRUNLID0gMjc7ICAgICAvKiBpOiB3YWl0aW5nIGZvciAzMi1iaXQgY2hlY2sgdmFsdWUgKi9cbnZhciAgICBMRU5HVEggPSAyODsgICAgLyogaTogd2FpdGluZyBmb3IgMzItYml0IGxlbmd0aCAoZ3ppcCkgKi9cbnZhciAgICBET05FID0gMjk7ICAgICAgLyogZmluaXNoZWQgY2hlY2ssIGRvbmUgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciAgICBCQUQgPSAzMDsgICAgICAgLyogZ290IGEgZGF0YSBlcnJvciAtLSByZW1haW4gaGVyZSB1bnRpbCByZXNldCAqL1xudmFyICAgIE1FTSA9IDMxOyAgICAgICAvKiBnb3QgYW4gaW5mbGF0ZSgpIG1lbW9yeSBlcnJvciAtLSByZW1haW4gaGVyZSB1bnRpbCByZXNldCAqL1xudmFyICAgIFNZTkMgPSAzMjsgICAgICAvKiBsb29raW5nIGZvciBzeW5jaHJvbml6YXRpb24gYnl0ZXMgdG8gcmVzdGFydCBpbmZsYXRlKCkgKi9cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG5cbnZhciBFTk9VR0hfTEVOUyA9IDg1MjtcbnZhciBFTk9VR0hfRElTVFMgPSA1OTI7XG4vL3ZhciBFTk9VR0ggPSAgKEVOT1VHSF9MRU5TK0VOT1VHSF9ESVNUUyk7XG5cbnZhciBNQVhfV0JJVFMgPSAxNTtcbi8qIDMySyBMWjc3IHdpbmRvdyAqL1xudmFyIERFRl9XQklUUyA9IE1BWF9XQklUUztcblxuXG5mdW5jdGlvbiB6c3dhcDMyKHEpIHtcbiAgcmV0dXJuICAoKChxID4+PiAyNCkgJiAweGZmKSArXG4gICAgICAgICAgKChxID4+PiA4KSAmIDB4ZmYwMCkgK1xuICAgICAgICAgICgocSAmIDB4ZmYwMCkgPDwgOCkgK1xuICAgICAgICAgICgocSAmIDB4ZmYpIDw8IDI0KSk7XG59XG5cblxuZnVuY3Rpb24gSW5mbGF0ZVN0YXRlKCkge1xuICB0aGlzLm1vZGUgPSAwOyAgICAgICAgICAgICAvKiBjdXJyZW50IGluZmxhdGUgbW9kZSAqL1xuICB0aGlzLmxhc3QgPSBmYWxzZTsgICAgICAgICAgLyogdHJ1ZSBpZiBwcm9jZXNzaW5nIGxhc3QgYmxvY2sgKi9cbiAgdGhpcy53cmFwID0gMDsgICAgICAgICAgICAgIC8qIGJpdCAwIHRydWUgZm9yIHpsaWIsIGJpdCAxIHRydWUgZm9yIGd6aXAgKi9cbiAgdGhpcy5oYXZlZGljdCA9IGZhbHNlOyAgICAgIC8qIHRydWUgaWYgZGljdGlvbmFyeSBwcm92aWRlZCAqL1xuICB0aGlzLmZsYWdzID0gMDsgICAgICAgICAgICAgLyogZ3ppcCBoZWFkZXIgbWV0aG9kIGFuZCBmbGFncyAoMCBpZiB6bGliKSAqL1xuICB0aGlzLmRtYXggPSAwOyAgICAgICAgICAgICAgLyogemxpYiBoZWFkZXIgbWF4IGRpc3RhbmNlIChJTkZMQVRFX1NUUklDVCkgKi9cbiAgdGhpcy5jaGVjayA9IDA7ICAgICAgICAgICAgIC8qIHByb3RlY3RlZCBjb3B5IG9mIGNoZWNrIHZhbHVlICovXG4gIHRoaXMudG90YWwgPSAwOyAgICAgICAgICAgICAvKiBwcm90ZWN0ZWQgY29weSBvZiBvdXRwdXQgY291bnQgKi9cbiAgLy8gVE9ETzogbWF5IGJlIHt9XG4gIHRoaXMuaGVhZCA9IG51bGw7ICAgICAgICAgICAvKiB3aGVyZSB0byBzYXZlIGd6aXAgaGVhZGVyIGluZm9ybWF0aW9uICovXG5cbiAgLyogc2xpZGluZyB3aW5kb3cgKi9cbiAgdGhpcy53Yml0cyA9IDA7ICAgICAgICAgICAgIC8qIGxvZyBiYXNlIDIgb2YgcmVxdWVzdGVkIHdpbmRvdyBzaXplICovXG4gIHRoaXMud3NpemUgPSAwOyAgICAgICAgICAgICAvKiB3aW5kb3cgc2l6ZSBvciB6ZXJvIGlmIG5vdCB1c2luZyB3aW5kb3cgKi9cbiAgdGhpcy53aGF2ZSA9IDA7ICAgICAgICAgICAgIC8qIHZhbGlkIGJ5dGVzIGluIHRoZSB3aW5kb3cgKi9cbiAgdGhpcy53bmV4dCA9IDA7ICAgICAgICAgICAgIC8qIHdpbmRvdyB3cml0ZSBpbmRleCAqL1xuICB0aGlzLndpbmRvdyA9IG51bGw7ICAgICAgICAgLyogYWxsb2NhdGVkIHNsaWRpbmcgd2luZG93LCBpZiBuZWVkZWQgKi9cblxuICAvKiBiaXQgYWNjdW11bGF0b3IgKi9cbiAgdGhpcy5ob2xkID0gMDsgICAgICAgICAgICAgIC8qIGlucHV0IGJpdCBhY2N1bXVsYXRvciAqL1xuICB0aGlzLmJpdHMgPSAwOyAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGJpdHMgaW4gXCJpblwiICovXG5cbiAgLyogZm9yIHN0cmluZyBhbmQgc3RvcmVkIGJsb2NrIGNvcHlpbmcgKi9cbiAgdGhpcy5sZW5ndGggPSAwOyAgICAgICAgICAgIC8qIGxpdGVyYWwgb3IgbGVuZ3RoIG9mIGRhdGEgdG8gY29weSAqL1xuICB0aGlzLm9mZnNldCA9IDA7ICAgICAgICAgICAgLyogZGlzdGFuY2UgYmFjayB0byBjb3B5IHN0cmluZyBmcm9tICovXG5cbiAgLyogZm9yIHRhYmxlIGFuZCBjb2RlIGRlY29kaW5nICovXG4gIHRoaXMuZXh0cmEgPSAwOyAgICAgICAgICAgICAvKiBleHRyYSBiaXRzIG5lZWRlZCAqL1xuXG4gIC8qIGZpeGVkIGFuZCBkeW5hbWljIGNvZGUgdGFibGVzICovXG4gIHRoaXMubGVuY29kZSA9IG51bGw7ICAgICAgICAgIC8qIHN0YXJ0aW5nIHRhYmxlIGZvciBsZW5ndGgvbGl0ZXJhbCBjb2RlcyAqL1xuICB0aGlzLmRpc3Rjb2RlID0gbnVsbDsgICAgICAgICAvKiBzdGFydGluZyB0YWJsZSBmb3IgZGlzdGFuY2UgY29kZXMgKi9cbiAgdGhpcy5sZW5iaXRzID0gMDsgICAgICAgICAgIC8qIGluZGV4IGJpdHMgZm9yIGxlbmNvZGUgKi9cbiAgdGhpcy5kaXN0Yml0cyA9IDA7ICAgICAgICAgIC8qIGluZGV4IGJpdHMgZm9yIGRpc3Rjb2RlICovXG5cbiAgLyogZHluYW1pYyB0YWJsZSBidWlsZGluZyAqL1xuICB0aGlzLm5jb2RlID0gMDsgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGNvZGUgbGVuZ3RoIGNvZGUgbGVuZ3RocyAqL1xuICB0aGlzLm5sZW4gPSAwOyAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGxlbmd0aCBjb2RlIGxlbmd0aHMgKi9cbiAgdGhpcy5uZGlzdCA9IDA7ICAgICAgICAgICAgIC8qIG51bWJlciBvZiBkaXN0YW5jZSBjb2RlIGxlbmd0aHMgKi9cbiAgdGhpcy5oYXZlID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBjb2RlIGxlbmd0aHMgaW4gbGVuc1tdICovXG4gIHRoaXMubmV4dCA9IG51bGw7ICAgICAgICAgICAgICAvKiBuZXh0IGF2YWlsYWJsZSBzcGFjZSBpbiBjb2Rlc1tdICovXG5cbiAgdGhpcy5sZW5zID0gbmV3IHV0aWxzLkJ1ZjE2KDMyMCk7IC8qIHRlbXBvcmFyeSBzdG9yYWdlIGZvciBjb2RlIGxlbmd0aHMgKi9cbiAgdGhpcy53b3JrID0gbmV3IHV0aWxzLkJ1ZjE2KDI4OCk7IC8qIHdvcmsgYXJlYSBmb3IgY29kZSB0YWJsZSBidWlsZGluZyAqL1xuXG4gIC8qXG4gICBiZWNhdXNlIHdlIGRvbid0IGhhdmUgcG9pbnRlcnMgaW4ganMsIHdlIHVzZSBsZW5jb2RlIGFuZCBkaXN0Y29kZSBkaXJlY3RseVxuICAgYXMgYnVmZmVycyBzbyB3ZSBkb24ndCBuZWVkIGNvZGVzXG4gICovXG4gIC8vdGhpcy5jb2RlcyA9IG5ldyB1dGlscy5CdWYzMihFTk9VR0gpOyAgICAgICAvKiBzcGFjZSBmb3IgY29kZSB0YWJsZXMgKi9cbiAgdGhpcy5sZW5keW4gPSBudWxsOyAgICAgICAgICAgICAgLyogZHluYW1pYyB0YWJsZSBmb3IgbGVuZ3RoL2xpdGVyYWwgY29kZXMgKEpTIHNwZWNpZmljKSAqL1xuICB0aGlzLmRpc3RkeW4gPSBudWxsOyAgICAgICAgICAgICAvKiBkeW5hbWljIHRhYmxlIGZvciBkaXN0YW5jZSBjb2RlcyAoSlMgc3BlY2lmaWMpICovXG4gIHRoaXMuc2FuZSA9IDA7ICAgICAgICAgICAgICAgICAgIC8qIGlmIGZhbHNlLCBhbGxvdyBpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgKi9cbiAgdGhpcy5iYWNrID0gMDsgICAgICAgICAgICAgICAgICAgLyogYml0cyBiYWNrIG9mIGxhc3QgdW5wcm9jZXNzZWQgbGVuZ3RoL2xpdCAqL1xuICB0aGlzLndhcyA9IDA7ICAgICAgICAgICAgICAgICAgICAvKiBpbml0aWFsIGxlbmd0aCBvZiBtYXRjaCAqL1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlUmVzZXRLZWVwKHN0cm0pIHtcbiAgdmFyIHN0YXRlO1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBzdHJtLnRvdGFsX2luID0gc3RybS50b3RhbF9vdXQgPSBzdGF0ZS50b3RhbCA9IDA7XG4gIHN0cm0ubXNnID0gJyc7IC8qWl9OVUxMKi9cbiAgaWYgKHN0YXRlLndyYXApIHsgICAgICAgLyogdG8gc3VwcG9ydCBpbGwtY29uY2VpdmVkIEphdmEgdGVzdCBzdWl0ZSAqL1xuICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS53cmFwICYgMTtcbiAgfVxuICBzdGF0ZS5tb2RlID0gSEVBRDtcbiAgc3RhdGUubGFzdCA9IDA7XG4gIHN0YXRlLmhhdmVkaWN0ID0gMDtcbiAgc3RhdGUuZG1heCA9IDMyNzY4O1xuICBzdGF0ZS5oZWFkID0gbnVsbC8qWl9OVUxMKi87XG4gIHN0YXRlLmhvbGQgPSAwO1xuICBzdGF0ZS5iaXRzID0gMDtcbiAgLy9zdGF0ZS5sZW5jb2RlID0gc3RhdGUuZGlzdGNvZGUgPSBzdGF0ZS5uZXh0ID0gc3RhdGUuY29kZXM7XG4gIHN0YXRlLmxlbmNvZGUgPSBzdGF0ZS5sZW5keW4gPSBuZXcgdXRpbHMuQnVmMzIoRU5PVUdIX0xFTlMpO1xuICBzdGF0ZS5kaXN0Y29kZSA9IHN0YXRlLmRpc3RkeW4gPSBuZXcgdXRpbHMuQnVmMzIoRU5PVUdIX0RJU1RTKTtcblxuICBzdGF0ZS5zYW5lID0gMTtcbiAgc3RhdGUuYmFjayA9IC0xO1xuICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6IHJlc2V0XFxuXCIpKTtcbiAgcmV0dXJuIFpfT0s7XG59XG5cbmZ1bmN0aW9uIGluZmxhdGVSZXNldChzdHJtKSB7XG4gIHZhciBzdGF0ZTtcblxuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgc3RhdGUud3NpemUgPSAwO1xuICBzdGF0ZS53aGF2ZSA9IDA7XG4gIHN0YXRlLnduZXh0ID0gMDtcbiAgcmV0dXJuIGluZmxhdGVSZXNldEtlZXAoc3RybSk7XG5cbn1cblxuZnVuY3Rpb24gaW5mbGF0ZVJlc2V0MihzdHJtLCB3aW5kb3dCaXRzKSB7XG4gIHZhciB3cmFwO1xuICB2YXIgc3RhdGU7XG5cbiAgLyogZ2V0IHRoZSBzdGF0ZSAqL1xuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0YXRlID0gc3RybS5zdGF0ZTtcblxuICAvKiBleHRyYWN0IHdyYXAgcmVxdWVzdCBmcm9tIHdpbmRvd0JpdHMgcGFyYW1ldGVyICovXG4gIGlmICh3aW5kb3dCaXRzIDwgMCkge1xuICAgIHdyYXAgPSAwO1xuICAgIHdpbmRvd0JpdHMgPSAtd2luZG93Qml0cztcbiAgfVxuICBlbHNlIHtcbiAgICB3cmFwID0gKHdpbmRvd0JpdHMgPj4gNCkgKyAxO1xuICAgIGlmICh3aW5kb3dCaXRzIDwgNDgpIHtcbiAgICAgIHdpbmRvd0JpdHMgJj0gMTU7XG4gICAgfVxuICB9XG5cbiAgLyogc2V0IG51bWJlciBvZiB3aW5kb3cgYml0cywgZnJlZSB3aW5kb3cgaWYgZGlmZmVyZW50ICovXG4gIGlmICh3aW5kb3dCaXRzICYmICh3aW5kb3dCaXRzIDwgOCB8fCB3aW5kb3dCaXRzID4gMTUpKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG4gIGlmIChzdGF0ZS53aW5kb3cgIT09IG51bGwgJiYgc3RhdGUud2JpdHMgIT09IHdpbmRvd0JpdHMpIHtcbiAgICBzdGF0ZS53aW5kb3cgPSBudWxsO1xuICB9XG5cbiAgLyogdXBkYXRlIHN0YXRlIGFuZCByZXNldCB0aGUgcmVzdCBvZiBpdCAqL1xuICBzdGF0ZS53cmFwID0gd3JhcDtcbiAgc3RhdGUud2JpdHMgPSB3aW5kb3dCaXRzO1xuICByZXR1cm4gaW5mbGF0ZVJlc2V0KHN0cm0pO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlSW5pdDIoc3RybSwgd2luZG93Qml0cykge1xuICB2YXIgcmV0O1xuICB2YXIgc3RhdGU7XG5cbiAgaWYgKCFzdHJtKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICAvL3N0cm0ubXNnID0gWl9OVUxMOyAgICAgICAgICAgICAgICAgLyogaW4gY2FzZSB3ZSByZXR1cm4gYW4gZXJyb3IgKi9cblxuICBzdGF0ZSA9IG5ldyBJbmZsYXRlU3RhdGUoKTtcblxuICAvL2lmIChzdGF0ZSA9PT0gWl9OVUxMKSByZXR1cm4gWl9NRU1fRVJST1I7XG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogYWxsb2NhdGVkXFxuXCIpKTtcbiAgc3RybS5zdGF0ZSA9IHN0YXRlO1xuICBzdGF0ZS53aW5kb3cgPSBudWxsLypaX05VTEwqLztcbiAgcmV0ID0gaW5mbGF0ZVJlc2V0MihzdHJtLCB3aW5kb3dCaXRzKTtcbiAgaWYgKHJldCAhPT0gWl9PSykge1xuICAgIHN0cm0uc3RhdGUgPSBudWxsLypaX05VTEwqLztcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlSW5pdChzdHJtKSB7XG4gIHJldHVybiBpbmZsYXRlSW5pdDIoc3RybSwgREVGX1dCSVRTKTtcbn1cblxuXG4vKlxuIFJldHVybiBzdGF0ZSB3aXRoIGxlbmd0aCBhbmQgZGlzdGFuY2UgZGVjb2RpbmcgdGFibGVzIGFuZCBpbmRleCBzaXplcyBzZXQgdG9cbiBmaXhlZCBjb2RlIGRlY29kaW5nLiAgTm9ybWFsbHkgdGhpcyByZXR1cm5zIGZpeGVkIHRhYmxlcyBmcm9tIGluZmZpeGVkLmguXG4gSWYgQlVJTERGSVhFRCBpcyBkZWZpbmVkLCB0aGVuIGluc3RlYWQgdGhpcyByb3V0aW5lIGJ1aWxkcyB0aGUgdGFibGVzIHRoZVxuIGZpcnN0IHRpbWUgaXQncyBjYWxsZWQsIGFuZCByZXR1cm5zIHRob3NlIHRhYmxlcyB0aGUgZmlyc3QgdGltZSBhbmRcbiB0aGVyZWFmdGVyLiAgVGhpcyByZWR1Y2VzIHRoZSBzaXplIG9mIHRoZSBjb2RlIGJ5IGFib3V0IDJLIGJ5dGVzLCBpblxuIGV4Y2hhbmdlIGZvciBhIGxpdHRsZSBleGVjdXRpb24gdGltZS4gIEhvd2V2ZXIsIEJVSUxERklYRUQgc2hvdWxkIG5vdCBiZVxuIHVzZWQgZm9yIHRocmVhZGVkIGFwcGxpY2F0aW9ucywgc2luY2UgdGhlIHJld3JpdGluZyBvZiB0aGUgdGFibGVzIGFuZCB2aXJnaW5cbiBtYXkgbm90IGJlIHRocmVhZC1zYWZlLlxuICovXG52YXIgdmlyZ2luID0gdHJ1ZTtcblxudmFyIGxlbmZpeCwgZGlzdGZpeDsgLy8gV2UgaGF2ZSBubyBwb2ludGVycyBpbiBKUywgc28ga2VlcCB0YWJsZXMgc2VwYXJhdGVcblxuZnVuY3Rpb24gZml4ZWR0YWJsZXMoc3RhdGUpIHtcbiAgLyogYnVpbGQgZml4ZWQgaHVmZm1hbiB0YWJsZXMgaWYgZmlyc3QgY2FsbCAobWF5IG5vdCBiZSB0aHJlYWQgc2FmZSkgKi9cbiAgaWYgKHZpcmdpbikge1xuICAgIHZhciBzeW07XG5cbiAgICBsZW5maXggPSBuZXcgdXRpbHMuQnVmMzIoNTEyKTtcbiAgICBkaXN0Zml4ID0gbmV3IHV0aWxzLkJ1ZjMyKDMyKTtcblxuICAgIC8qIGxpdGVyYWwvbGVuZ3RoIHRhYmxlICovXG4gICAgc3ltID0gMDtcbiAgICB3aGlsZSAoc3ltIDwgMTQ0KSB7IHN0YXRlLmxlbnNbc3ltKytdID0gODsgfVxuICAgIHdoaWxlIChzeW0gPCAyNTYpIHsgc3RhdGUubGVuc1tzeW0rK10gPSA5OyB9XG4gICAgd2hpbGUgKHN5bSA8IDI4MCkgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDc7IH1cbiAgICB3aGlsZSAoc3ltIDwgMjg4KSB7IHN0YXRlLmxlbnNbc3ltKytdID0gODsgfVxuXG4gICAgaW5mbGF0ZV90YWJsZShMRU5TLCAgc3RhdGUubGVucywgMCwgMjg4LCBsZW5maXgsICAgMCwgc3RhdGUud29yaywgeyBiaXRzOiA5IH0pO1xuXG4gICAgLyogZGlzdGFuY2UgdGFibGUgKi9cbiAgICBzeW0gPSAwO1xuICAgIHdoaWxlIChzeW0gPCAzMikgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDU7IH1cblxuICAgIGluZmxhdGVfdGFibGUoRElTVFMsIHN0YXRlLmxlbnMsIDAsIDMyLCAgIGRpc3RmaXgsIDAsIHN0YXRlLndvcmssIHsgYml0czogNSB9KTtcblxuICAgIC8qIGRvIHRoaXMganVzdCBvbmNlICovXG4gICAgdmlyZ2luID0gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5sZW5jb2RlID0gbGVuZml4O1xuICBzdGF0ZS5sZW5iaXRzID0gOTtcbiAgc3RhdGUuZGlzdGNvZGUgPSBkaXN0Zml4O1xuICBzdGF0ZS5kaXN0Yml0cyA9IDU7XG59XG5cblxuLypcbiBVcGRhdGUgdGhlIHdpbmRvdyB3aXRoIHRoZSBsYXN0IHdzaXplIChub3JtYWxseSAzMkspIGJ5dGVzIHdyaXR0ZW4gYmVmb3JlXG4gcmV0dXJuaW5nLiAgSWYgd2luZG93IGRvZXMgbm90IGV4aXN0IHlldCwgY3JlYXRlIGl0LiAgVGhpcyBpcyBvbmx5IGNhbGxlZFxuIHdoZW4gYSB3aW5kb3cgaXMgYWxyZWFkeSBpbiB1c2UsIG9yIHdoZW4gb3V0cHV0IGhhcyBiZWVuIHdyaXR0ZW4gZHVyaW5nIHRoaXNcbiBpbmZsYXRlIGNhbGwsIGJ1dCB0aGUgZW5kIG9mIHRoZSBkZWZsYXRlIHN0cmVhbSBoYXMgbm90IGJlZW4gcmVhY2hlZCB5ZXQuXG4gSXQgaXMgYWxzbyBjYWxsZWQgdG8gY3JlYXRlIGEgd2luZG93IGZvciBkaWN0aW9uYXJ5IGRhdGEgd2hlbiBhIGRpY3Rpb25hcnlcbiBpcyBsb2FkZWQuXG5cbiBQcm92aWRpbmcgb3V0cHV0IGJ1ZmZlcnMgbGFyZ2VyIHRoYW4gMzJLIHRvIGluZmxhdGUoKSBzaG91bGQgcHJvdmlkZSBhIHNwZWVkXG4gYWR2YW50YWdlLCBzaW5jZSBvbmx5IHRoZSBsYXN0IDMySyBvZiBvdXRwdXQgaXMgY29waWVkIHRvIHRoZSBzbGlkaW5nIHdpbmRvd1xuIHVwb24gcmV0dXJuIGZyb20gaW5mbGF0ZSgpLCBhbmQgc2luY2UgYWxsIGRpc3RhbmNlcyBhZnRlciB0aGUgZmlyc3QgMzJLIG9mXG4gb3V0cHV0IHdpbGwgZmFsbCBpbiB0aGUgb3V0cHV0IGRhdGEsIG1ha2luZyBtYXRjaCBjb3BpZXMgc2ltcGxlciBhbmQgZmFzdGVyLlxuIFRoZSBhZHZhbnRhZ2UgbWF5IGJlIGRlcGVuZGVudCBvbiB0aGUgc2l6ZSBvZiB0aGUgcHJvY2Vzc29yJ3MgZGF0YSBjYWNoZXMuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZXdpbmRvdyhzdHJtLCBzcmMsIGVuZCwgY29weSkge1xuICB2YXIgZGlzdDtcbiAgdmFyIHN0YXRlID0gc3RybS5zdGF0ZTtcblxuICAvKiBpZiBpdCBoYXNuJ3QgYmVlbiBkb25lIGFscmVhZHksIGFsbG9jYXRlIHNwYWNlIGZvciB0aGUgd2luZG93ICovXG4gIGlmIChzdGF0ZS53aW5kb3cgPT09IG51bGwpIHtcbiAgICBzdGF0ZS53c2l6ZSA9IDEgPDwgc3RhdGUud2JpdHM7XG4gICAgc3RhdGUud25leHQgPSAwO1xuICAgIHN0YXRlLndoYXZlID0gMDtcblxuICAgIHN0YXRlLndpbmRvdyA9IG5ldyB1dGlscy5CdWY4KHN0YXRlLndzaXplKTtcbiAgfVxuXG4gIC8qIGNvcHkgc3RhdGUtPndzaXplIG9yIGxlc3Mgb3V0cHV0IGJ5dGVzIGludG8gdGhlIGNpcmN1bGFyIHdpbmRvdyAqL1xuICBpZiAoY29weSA+PSBzdGF0ZS53c2l6ZSkge1xuICAgIHV0aWxzLmFycmF5U2V0KHN0YXRlLndpbmRvdywgc3JjLCBlbmQgLSBzdGF0ZS53c2l6ZSwgc3RhdGUud3NpemUsIDApO1xuICAgIHN0YXRlLnduZXh0ID0gMDtcbiAgICBzdGF0ZS53aGF2ZSA9IHN0YXRlLndzaXplO1xuICB9XG4gIGVsc2Uge1xuICAgIGRpc3QgPSBzdGF0ZS53c2l6ZSAtIHN0YXRlLnduZXh0O1xuICAgIGlmIChkaXN0ID4gY29weSkge1xuICAgICAgZGlzdCA9IGNvcHk7XG4gICAgfVxuICAgIC8vem1lbWNweShzdGF0ZS0+d2luZG93ICsgc3RhdGUtPnduZXh0LCBlbmQgLSBjb3B5LCBkaXN0KTtcbiAgICB1dGlscy5hcnJheVNldChzdGF0ZS53aW5kb3csIHNyYywgZW5kIC0gY29weSwgZGlzdCwgc3RhdGUud25leHQpO1xuICAgIGNvcHkgLT0gZGlzdDtcbiAgICBpZiAoY29weSkge1xuICAgICAgLy96bWVtY3B5KHN0YXRlLT53aW5kb3csIGVuZCAtIGNvcHksIGNvcHkpO1xuICAgICAgdXRpbHMuYXJyYXlTZXQoc3RhdGUud2luZG93LCBzcmMsIGVuZCAtIGNvcHksIGNvcHksIDApO1xuICAgICAgc3RhdGUud25leHQgPSBjb3B5O1xuICAgICAgc3RhdGUud2hhdmUgPSBzdGF0ZS53c2l6ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzdGF0ZS53bmV4dCArPSBkaXN0O1xuICAgICAgaWYgKHN0YXRlLnduZXh0ID09PSBzdGF0ZS53c2l6ZSkgeyBzdGF0ZS53bmV4dCA9IDA7IH1cbiAgICAgIGlmIChzdGF0ZS53aGF2ZSA8IHN0YXRlLndzaXplKSB7IHN0YXRlLndoYXZlICs9IGRpc3Q7IH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGluZmxhdGUoc3RybSwgZmx1c2gpIHtcbiAgdmFyIHN0YXRlO1xuICB2YXIgaW5wdXQsIG91dHB1dDsgICAgICAgICAgLy8gaW5wdXQvb3V0cHV0IGJ1ZmZlcnNcbiAgdmFyIG5leHQ7ICAgICAgICAgICAgICAgICAgIC8qIG5leHQgaW5wdXQgSU5ERVggKi9cbiAgdmFyIHB1dDsgICAgICAgICAgICAgICAgICAgIC8qIG5leHQgb3V0cHV0IElOREVYICovXG4gIHZhciBoYXZlLCBsZWZ0OyAgICAgICAgICAgICAvKiBhdmFpbGFibGUgaW5wdXQgYW5kIG91dHB1dCAqL1xuICB2YXIgaG9sZDsgICAgICAgICAgICAgICAgICAgLyogYml0IGJ1ZmZlciAqL1xuICB2YXIgYml0czsgICAgICAgICAgICAgICAgICAgLyogYml0cyBpbiBiaXQgYnVmZmVyICovXG4gIHZhciBfaW4sIF9vdXQ7ICAgICAgICAgICAgICAvKiBzYXZlIHN0YXJ0aW5nIGF2YWlsYWJsZSBpbnB1dCBhbmQgb3V0cHV0ICovXG4gIHZhciBjb3B5OyAgICAgICAgICAgICAgICAgICAvKiBudW1iZXIgb2Ygc3RvcmVkIG9yIG1hdGNoIGJ5dGVzIHRvIGNvcHkgKi9cbiAgdmFyIGZyb207ICAgICAgICAgICAgICAgICAgIC8qIHdoZXJlIHRvIGNvcHkgbWF0Y2ggYnl0ZXMgZnJvbSAqL1xuICB2YXIgZnJvbV9zb3VyY2U7XG4gIHZhciBoZXJlID0gMDsgICAgICAgICAgICAgICAvKiBjdXJyZW50IGRlY29kaW5nIHRhYmxlIGVudHJ5ICovXG4gIHZhciBoZXJlX2JpdHMsIGhlcmVfb3AsIGhlcmVfdmFsOyAvLyBwYWtlZCBcImhlcmVcIiBkZW5vcm1hbGl6ZWQgKEpTIHNwZWNpZmljKVxuICAvL3ZhciBsYXN0OyAgICAgICAgICAgICAgICAgICAvKiBwYXJlbnQgdGFibGUgZW50cnkgKi9cbiAgdmFyIGxhc3RfYml0cywgbGFzdF9vcCwgbGFzdF92YWw7IC8vIHBha2VkIFwibGFzdFwiIGRlbm9ybWFsaXplZCAoSlMgc3BlY2lmaWMpXG4gIHZhciBsZW47ICAgICAgICAgICAgICAgICAgICAvKiBsZW5ndGggdG8gY29weSBmb3IgcmVwZWF0cywgYml0cyB0byBkcm9wICovXG4gIHZhciByZXQ7ICAgICAgICAgICAgICAgICAgICAvKiByZXR1cm4gY29kZSAqL1xuICB2YXIgaGJ1ZiA9IG5ldyB1dGlscy5CdWY4KDQpOyAgICAvKiBidWZmZXIgZm9yIGd6aXAgaGVhZGVyIGNyYyBjYWxjdWxhdGlvbiAqL1xuICB2YXIgb3B0cztcblxuICB2YXIgbjsgLy8gdGVtcG9yYXJ5IHZhciBmb3IgTkVFRF9CSVRTXG5cbiAgdmFyIG9yZGVyID0gLyogcGVybXV0YXRpb24gb2YgY29kZSBsZW5ndGhzICovXG4gICAgWyAxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1IF07XG5cblxuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUgfHwgIXN0cm0ub3V0cHV0IHx8XG4gICAgICAoIXN0cm0uaW5wdXQgJiYgc3RybS5hdmFpbF9pbiAhPT0gMCkpIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG4gIGlmIChzdGF0ZS5tb2RlID09PSBUWVBFKSB7IHN0YXRlLm1vZGUgPSBUWVBFRE87IH0gICAgLyogc2tpcCBjaGVjayAqL1xuXG5cbiAgLy8tLS0gTE9BRCgpIC0tLVxuICBwdXQgPSBzdHJtLm5leHRfb3V0O1xuICBvdXRwdXQgPSBzdHJtLm91dHB1dDtcbiAgbGVmdCA9IHN0cm0uYXZhaWxfb3V0O1xuICBuZXh0ID0gc3RybS5uZXh0X2luO1xuICBpbnB1dCA9IHN0cm0uaW5wdXQ7XG4gIGhhdmUgPSBzdHJtLmF2YWlsX2luO1xuICBob2xkID0gc3RhdGUuaG9sZDtcbiAgYml0cyA9IHN0YXRlLmJpdHM7XG4gIC8vLS0tXG5cbiAgX2luID0gaGF2ZTtcbiAgX291dCA9IGxlZnQ7XG4gIHJldCA9IFpfT0s7XG5cbiAgaW5mX2xlYXZlOiAvLyBnb3RvIGVtdWxhdGlvblxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChzdGF0ZS5tb2RlKSB7XG4gICAgICBjYXNlIEhFQUQ6XG4gICAgICAgIGlmIChzdGF0ZS53cmFwID09PSAwKSB7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IFRZUEVETztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLz09PSBORUVEQklUUygxNik7XG4gICAgICAgIHdoaWxlIChiaXRzIDwgMTYpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgaWYgKChzdGF0ZS53cmFwICYgMikgJiYgaG9sZCA9PT0gMHg4YjFmKSB7ICAvKiBnemlwIGhlYWRlciAqL1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gMC8qY3JjMzIoMEwsIFpfTlVMTCwgMCkqLztcbiAgICAgICAgICAvLz09PSBDUkMyKHN0YXRlLmNoZWNrLCBob2xkKTtcbiAgICAgICAgICBoYnVmWzBdID0gaG9sZCAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaGJ1ZiwgMiwgMCk7XG4gICAgICAgICAgLy89PT0vL1xuXG4gICAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgICBob2xkID0gMDtcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUubW9kZSA9IEZMQUdTO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmZsYWdzID0gMDsgICAgICAgICAgIC8qIGV4cGVjdCB6bGliIGhlYWRlciAqL1xuICAgICAgICBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuZG9uZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHN0YXRlLndyYXAgJiAxKSB8fCAgIC8qIGNoZWNrIGlmIHpsaWIgaGVhZGVyIGFsbG93ZWQgKi9cbiAgICAgICAgICAoKChob2xkICYgMHhmZikvKkJJVFMoOCkqLyA8PCA4KSArIChob2xkID4+IDgpKSAlIDMxKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW5jb3JyZWN0IGhlYWRlciBjaGVjayc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGhvbGQgJiAweDBmKS8qQklUUyg0KSovICE9PSBaX0RFRkxBVEVEKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAndW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoNCkgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IDQ7XG4gICAgICAgIGJpdHMgLT0gNDtcbiAgICAgICAgLy8tLS0vL1xuICAgICAgICBsZW4gPSAoaG9sZCAmIDB4MGYpLypCSVRTKDQpKi8gKyA4O1xuICAgICAgICBpZiAoc3RhdGUud2JpdHMgPT09IDApIHtcbiAgICAgICAgICBzdGF0ZS53Yml0cyA9IGxlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW4gPiBzdGF0ZS53Yml0cykge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgd2luZG93IHNpemUnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuZG1heCA9IDEgPDwgbGVuO1xuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgemxpYiBoZWFkZXIgb2tcXG5cIikpO1xuICAgICAgICBzdHJtLmFkbGVyID0gc3RhdGUuY2hlY2sgPSAxLyphZGxlcjMyKDBMLCBaX05VTEwsIDApKi87XG4gICAgICAgIHN0YXRlLm1vZGUgPSBob2xkICYgMHgyMDAgPyBESUNUSUQgOiBUWVBFO1xuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZMQUdTOlxuICAgICAgICAvLz09PSBORUVEQklUUygxNik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMTYpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUuZmxhZ3MgPSBob2xkO1xuICAgICAgICBpZiAoKHN0YXRlLmZsYWdzICYgMHhmZikgIT09IFpfREVGTEFURUQpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICd1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZCc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweGUwMDApIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICd1bmtub3duIGhlYWRlciBmbGFncyBzZXQnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLnRleHQgPSAoKGhvbGQgPj4gOCkgJiAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAvLz09PSBDUkMyKHN0YXRlLmNoZWNrLCBob2xkKTtcbiAgICAgICAgICBoYnVmWzBdID0gaG9sZCAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaGJ1ZiwgMiwgMCk7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICB9XG4gICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgIGhvbGQgPSAwO1xuICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgLy89PT0vL1xuICAgICAgICBzdGF0ZS5tb2RlID0gVElNRTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBUSU1FOlxuICAgICAgICAvLz09PSBORUVEQklUUygzMik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLnRpbWUgPSBob2xkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgIC8vPT09IENSQzQoc3RhdGUuY2hlY2ssIGhvbGQpXG4gICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgIGhidWZbMV0gPSAoaG9sZCA+Pj4gOCkgJiAweGZmO1xuICAgICAgICAgIGhidWZbMl0gPSAoaG9sZCA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzNdID0gKGhvbGQgPj4+IDI0KSAmIDB4ZmY7XG4gICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaGJ1ZiwgNCwgMCk7XG4gICAgICAgICAgLy89PT1cbiAgICAgICAgfVxuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubW9kZSA9IE9TO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIE9TOlxuICAgICAgICAvLz09PSBORUVEQklUUygxNik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMTYpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLnhmbGFncyA9IChob2xkICYgMHhmZik7XG4gICAgICAgICAgc3RhdGUuaGVhZC5vcyA9IChob2xkID4+IDgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgIC8vPT09IENSQzIoc3RhdGUuY2hlY2ssIGhvbGQpO1xuICAgICAgICAgIGhidWZbMF0gPSBob2xkICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzFdID0gKGhvbGQgPj4+IDgpICYgMHhmZjtcbiAgICAgICAgICBzdGF0ZS5jaGVjayA9IGNyYzMyKHN0YXRlLmNoZWNrLCBoYnVmLCAyLCAwKTtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgIH1cbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBFWExFTjtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBFWExFTjpcbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwNDAwKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgMTYpIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBzdGF0ZS5sZW5ndGggPSBob2xkO1xuICAgICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhX2xlbiA9IGhvbGQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgICAgLy89PT0gQ1JDMihzdGF0ZS5jaGVjaywgaG9sZCk7XG4gICAgICAgICAgICBoYnVmWzBdID0gaG9sZCAmIDB4ZmY7XG4gICAgICAgICAgICBoYnVmWzFdID0gKGhvbGQgPj4+IDgpICYgMHhmZjtcbiAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDIsIDApO1xuICAgICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC5leHRyYSA9IG51bGwvKlpfTlVMTCovO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLm1vZGUgPSBFWFRSQTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBFWFRSQTpcbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwNDAwKSB7XG4gICAgICAgICAgY29weSA9IHN0YXRlLmxlbmd0aDtcbiAgICAgICAgICBpZiAoY29weSA+IGhhdmUpIHsgY29weSA9IGhhdmU7IH1cbiAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICAgICAgbGVuID0gc3RhdGUuaGVhZC5leHRyYV9sZW4gLSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmICghc3RhdGUuaGVhZC5leHRyYSkge1xuICAgICAgICAgICAgICAgIC8vIFVzZSB1bnR5cGVkIGFycmF5IGZvciBtb3JlIGNvbnZlbmllbnQgcHJvY2Vzc2luZyBsYXRlclxuICAgICAgICAgICAgICAgIHN0YXRlLmhlYWQuZXh0cmEgPSBuZXcgQXJyYXkoc3RhdGUuaGVhZC5leHRyYV9sZW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHV0aWxzLmFycmF5U2V0KFxuICAgICAgICAgICAgICAgIHN0YXRlLmhlYWQuZXh0cmEsXG4gICAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgICAgICAvLyBleHRyYSBmaWVsZCBpcyBsaW1pdGVkIHRvIDY1NTM2IGJ5dGVzXG4gICAgICAgICAgICAgICAgLy8gLSBubyBuZWVkIGZvciBhZGRpdGlvbmFsIHNpemUgY2hlY2tcbiAgICAgICAgICAgICAgICBjb3B5LFxuICAgICAgICAgICAgICAgIC8qbGVuICsgY29weSA+IHN0YXRlLmhlYWQuZXh0cmFfbWF4IC0gbGVuID8gc3RhdGUuaGVhZC5leHRyYV9tYXggOiBjb3B5LCovXG4gICAgICAgICAgICAgICAgbGVuXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIC8vem1lbWNweShzdGF0ZS5oZWFkLmV4dHJhICsgbGVuLCBuZXh0LFxuICAgICAgICAgICAgICAvLyAgICAgICAgbGVuICsgY29weSA+IHN0YXRlLmhlYWQuZXh0cmFfbWF4ID9cbiAgICAgICAgICAgICAgLy8gICAgICAgIHN0YXRlLmhlYWQuZXh0cmFfbWF4IC0gbGVuIDogY29weSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaW5wdXQsIGNvcHksIG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgICAgbmV4dCArPSBjb3B5O1xuICAgICAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGF0ZS5sZW5ndGgpIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubGVuZ3RoID0gMDtcbiAgICAgICAgc3RhdGUubW9kZSA9IE5BTUU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTkFNRTpcbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwODAwKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgY29weSA9IDA7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gVE9ETzogMiBvciAxIGJ5dGVzP1xuICAgICAgICAgICAgbGVuID0gaW5wdXRbbmV4dCArIGNvcHkrK107XG4gICAgICAgICAgICAvKiB1c2UgY29uc3RhbnQgbGltaXQgYmVjYXVzZSBpbiBqcyB3ZSBzaG91bGQgbm90IHByZWFsbG9jYXRlIG1lbW9yeSAqL1xuICAgICAgICAgICAgaWYgKHN0YXRlLmhlYWQgJiYgbGVuICYmXG4gICAgICAgICAgICAgICAgKHN0YXRlLmxlbmd0aCA8IDY1NTM2IC8qc3RhdGUuaGVhZC5uYW1lX21heCovKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5oZWFkLm5hbWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShsZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKGxlbiAmJiBjb3B5IDwgaGF2ZSk7XG5cbiAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGlucHV0LCBjb3B5LCBuZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICBpZiAobGVuKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLm5hbWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmxlbmd0aCA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT01NRU5UO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIENPTU1FTlQ6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MTAwMCkge1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGNvcHkgPSAwO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxlbiA9IGlucHV0W25leHQgKyBjb3B5KytdO1xuICAgICAgICAgICAgLyogdXNlIGNvbnN0YW50IGxpbWl0IGJlY2F1c2UgaW4ganMgd2Ugc2hvdWxkIG5vdCBwcmVhbGxvY2F0ZSBtZW1vcnkgKi9cbiAgICAgICAgICAgIGlmIChzdGF0ZS5oZWFkICYmIGxlbiAmJlxuICAgICAgICAgICAgICAgIChzdGF0ZS5sZW5ndGggPCA2NTUzNiAvKnN0YXRlLmhlYWQuY29tbV9tYXgqLykpIHtcbiAgICAgICAgICAgICAgc3RhdGUuaGVhZC5jb21tZW50ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUobGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChsZW4gJiYgY29weSA8IGhhdmUpO1xuICAgICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaW5wdXQsIGNvcHksIG5leHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYXZlIC09IGNvcHk7XG4gICAgICAgICAgbmV4dCArPSBjb3B5O1xuICAgICAgICAgIGlmIChsZW4pIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuY29tbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubW9kZSA9IEhDUkM7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgSENSQzpcbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgMTYpIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBpZiAoaG9sZCAhPT0gKHN0YXRlLmNoZWNrICYgMHhmZmZmKSkge1xuICAgICAgICAgICAgc3RybS5tc2cgPSAnaGVhZGVyIGNyYyBtaXNtYXRjaCc7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC5oY3JjID0gKChzdGF0ZS5mbGFncyA+PiA5KSAmIDEpO1xuICAgICAgICAgIHN0YXRlLmhlYWQuZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0gMDtcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUNUSUQ6XG4gICAgICAgIC8vPT09IE5FRURCSVRTKDMyKTsgKi9cbiAgICAgICAgd2hpbGUgKGJpdHMgPCAzMikge1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgIH1cbiAgICAgICAgLy89PT0vL1xuICAgICAgICBzdHJtLmFkbGVyID0gc3RhdGUuY2hlY2sgPSB6c3dhcDMyKGhvbGQpO1xuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubW9kZSA9IERJQ1Q7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRElDVDpcbiAgICAgICAgaWYgKHN0YXRlLmhhdmVkaWN0ID09PSAwKSB7XG4gICAgICAgICAgLy8tLS0gUkVTVE9SRSgpIC0tLVxuICAgICAgICAgIHN0cm0ubmV4dF9vdXQgPSBwdXQ7XG4gICAgICAgICAgc3RybS5hdmFpbF9vdXQgPSBsZWZ0O1xuICAgICAgICAgIHN0cm0ubmV4dF9pbiA9IG5leHQ7XG4gICAgICAgICAgc3RybS5hdmFpbF9pbiA9IGhhdmU7XG4gICAgICAgICAgc3RhdGUuaG9sZCA9IGhvbGQ7XG4gICAgICAgICAgc3RhdGUuYml0cyA9IGJpdHM7XG4gICAgICAgICAgLy8tLS1cbiAgICAgICAgICByZXR1cm4gWl9ORUVEX0RJQ1Q7XG4gICAgICAgIH1cbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0gMS8qYWRsZXIzMigwTCwgWl9OVUxMLCAwKSovO1xuICAgICAgICBzdGF0ZS5tb2RlID0gVFlQRTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBUWVBFOlxuICAgICAgICBpZiAoZmx1c2ggPT09IFpfQkxPQ0sgfHwgZmx1c2ggPT09IFpfVFJFRVMpIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgVFlQRURPOlxuICAgICAgICBpZiAoc3RhdGUubGFzdCkge1xuICAgICAgICAgIC8vLS0tIEJZVEVCSVRTKCkgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gYml0cyAmIDc7XG4gICAgICAgICAgYml0cyAtPSBiaXRzICYgNztcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgc3RhdGUubW9kZSA9IENIRUNLO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vPT09IE5FRURCSVRTKDMpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDMpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubGFzdCA9IChob2xkICYgMHgwMSkvKkJJVFMoMSkqLztcbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoMSkgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IDE7XG4gICAgICAgIGJpdHMgLT0gMTtcbiAgICAgICAgLy8tLS0vL1xuXG4gICAgICAgIHN3aXRjaCAoKGhvbGQgJiAweDAzKS8qQklUUygyKSovKSB7XG4gICAgICAgICAgY2FzZSAwOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogc3RvcmVkIGJsb2NrICovXG4gICAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICBzdG9yZWQgYmxvY2slc1xcblwiLFxuICAgICAgICAgICAgLy8gICAgICAgIHN0YXRlLmxhc3QgPyBcIiAobGFzdClcIiA6IFwiXCIpKTtcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBTVE9SRUQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBmaXhlZCBibG9jayAqL1xuICAgICAgICAgICAgZml4ZWR0YWJsZXMoc3RhdGUpO1xuICAgICAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgZml4ZWQgY29kZXMgYmxvY2slc1xcblwiLFxuICAgICAgICAgICAgLy8gICAgICAgIHN0YXRlLmxhc3QgPyBcIiAobGFzdClcIiA6IFwiXCIpKTtcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBMRU5fOyAgICAgICAgICAgICAvKiBkZWNvZGUgY29kZXMgKi9cbiAgICAgICAgICAgIGlmIChmbHVzaCA9PT0gWl9UUkVFUykge1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUygyKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gMjtcbiAgICAgICAgICAgICAgYml0cyAtPSAyO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICAgIGJyZWFrIGluZl9sZWF2ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGR5bmFtaWMgYmxvY2sgKi9cbiAgICAgICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgIGR5bmFtaWMgY29kZXMgYmxvY2slc1xcblwiLFxuICAgICAgICAgICAgLy8gICAgICAgIHN0YXRlLmxhc3QgPyBcIiAobGFzdClcIiA6IFwiXCIpKTtcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBUQUJMRTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgYmxvY2sgdHlwZSc7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDIpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSAyO1xuICAgICAgICBiaXRzIC09IDI7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNUT1JFRDpcbiAgICAgICAgLy8tLS0gQllURUJJVFMoKSAtLS0vLyAvKiBnbyB0byBieXRlIGJvdW5kYXJ5ICovXG4gICAgICAgIGhvbGQgPj4+PSBiaXRzICYgNztcbiAgICAgICAgYml0cyAtPSBiaXRzICYgNztcbiAgICAgICAgLy8tLS0vL1xuICAgICAgICAvLz09PSBORUVEQklUUygzMik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgaWYgKChob2xkICYgMHhmZmZmKSAhPT0gKChob2xkID4+PiAxNikgXiAweGZmZmYpKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3Rocyc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5sZW5ndGggPSBob2xkICYgMHhmZmZmO1xuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgIHN0b3JlZCBsZW5ndGggJXVcXG5cIixcbiAgICAgICAgLy8gICAgICAgIHN0YXRlLmxlbmd0aCkpO1xuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubW9kZSA9IENPUFlfO1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfVFJFRVMpIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgQ09QWV86XG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT1BZO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIENPUFk6XG4gICAgICAgIGNvcHkgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgIGlmIChjb3B5KSB7XG4gICAgICAgICAgaWYgKGNvcHkgPiBoYXZlKSB7IGNvcHkgPSBoYXZlOyB9XG4gICAgICAgICAgaWYgKGNvcHkgPiBsZWZ0KSB7IGNvcHkgPSBsZWZ0OyB9XG4gICAgICAgICAgaWYgKGNvcHkgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgLy8tLS0gem1lbWNweShwdXQsIG5leHQsIGNvcHkpOyAtLS1cbiAgICAgICAgICB1dGlscy5hcnJheVNldChvdXRwdXQsIGlucHV0LCBuZXh0LCBjb3B5LCBwdXQpO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBoYXZlIC09IGNvcHk7XG4gICAgICAgICAgbmV4dCArPSBjb3B5O1xuICAgICAgICAgIGxlZnQgLT0gY29weTtcbiAgICAgICAgICBwdXQgKz0gY29weTtcbiAgICAgICAgICBzdGF0ZS5sZW5ndGggLT0gY29weTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgIHN0b3JlZCBlbmRcXG5cIikpO1xuICAgICAgICBzdGF0ZS5tb2RlID0gVFlQRTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRBQkxFOlxuICAgICAgICAvLz09PSBORUVEQklUUygxNCk7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMTQpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubmxlbiA9IChob2xkICYgMHgxZikvKkJJVFMoNSkqLyArIDI1NztcbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoNSkgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IDU7XG4gICAgICAgIGJpdHMgLT0gNTtcbiAgICAgICAgLy8tLS0vL1xuICAgICAgICBzdGF0ZS5uZGlzdCA9IChob2xkICYgMHgxZikvKkJJVFMoNSkqLyArIDE7XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDUpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSA1O1xuICAgICAgICBiaXRzIC09IDU7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgc3RhdGUubmNvZGUgPSAoaG9sZCAmIDB4MGYpLypCSVRTKDQpKi8gKyA0O1xuICAgICAgICAvLy0tLSBEUk9QQklUUyg0KSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gNDtcbiAgICAgICAgYml0cyAtPSA0O1xuICAgICAgICAvLy0tLS8vXG4vLyNpZm5kZWYgUEtaSVBfQlVHX1dPUktBUk9VTkRcbiAgICAgICAgaWYgKHN0YXRlLm5sZW4gPiAyODYgfHwgc3RhdGUubmRpc3QgPiAzMCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ3RvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4vLyNlbmRpZlxuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgIHRhYmxlIHNpemVzIG9rXFxuXCIpKTtcbiAgICAgICAgc3RhdGUuaGF2ZSA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU5MRU5TO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIExFTkxFTlM6XG4gICAgICAgIHdoaWxlIChzdGF0ZS5oYXZlIDwgc3RhdGUubmNvZGUpIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUygzKTtcbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDMpIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBzdGF0ZS5sZW5zW29yZGVyW3N0YXRlLmhhdmUrK11dID0gKGhvbGQgJiAweDA3KTsvL0JJVFMoMyk7XG4gICAgICAgICAgLy8tLS0gRFJPUEJJVFMoMykgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gMztcbiAgICAgICAgICBiaXRzIC09IDM7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChzdGF0ZS5oYXZlIDwgMTkpIHtcbiAgICAgICAgICBzdGF0ZS5sZW5zW29yZGVyW3N0YXRlLmhhdmUrK11dID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBoYXZlIHNlcGFyYXRlIHRhYmxlcyAmIG5vIHBvaW50ZXJzLiAyIGNvbW1lbnRlZCBsaW5lcyBiZWxvdyBub3QgbmVlZGVkLlxuICAgICAgICAvL3N0YXRlLm5leHQgPSBzdGF0ZS5jb2RlcztcbiAgICAgICAgLy9zdGF0ZS5sZW5jb2RlID0gc3RhdGUubmV4dDtcbiAgICAgICAgLy8gU3dpdGNoIHRvIHVzZSBkeW5hbWljIHRhYmxlXG4gICAgICAgIHN0YXRlLmxlbmNvZGUgPSBzdGF0ZS5sZW5keW47XG4gICAgICAgIHN0YXRlLmxlbmJpdHMgPSA3O1xuXG4gICAgICAgIG9wdHMgPSB7IGJpdHM6IHN0YXRlLmxlbmJpdHMgfTtcbiAgICAgICAgcmV0ID0gaW5mbGF0ZV90YWJsZShDT0RFUywgc3RhdGUubGVucywgMCwgMTksIHN0YXRlLmxlbmNvZGUsIDAsIHN0YXRlLndvcmssIG9wdHMpO1xuICAgICAgICBzdGF0ZS5sZW5iaXRzID0gb3B0cy5iaXRzO1xuXG4gICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXQnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICBjb2RlIGxlbmd0aHMgb2tcXG5cIikpO1xuICAgICAgICBzdGF0ZS5oYXZlID0gMDtcbiAgICAgICAgc3RhdGUubW9kZSA9IENPREVMRU5TO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIENPREVMRU5TOlxuICAgICAgICB3aGlsZSAoc3RhdGUuaGF2ZSA8IHN0YXRlLm5sZW4gKyBzdGF0ZS5uZGlzdCkge1xuICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgIGhlcmUgPSBzdGF0ZS5sZW5jb2RlW2hvbGQgJiAoKDEgPDwgc3RhdGUubGVuYml0cykgLSAxKV07LypCSVRTKHN0YXRlLmxlbmJpdHMpKi9cbiAgICAgICAgICAgIGhlcmVfYml0cyA9IGhlcmUgPj4+IDI0O1xuICAgICAgICAgICAgaGVyZV9vcCA9IChoZXJlID4+PiAxNikgJiAweGZmO1xuICAgICAgICAgICAgaGVyZV92YWwgPSBoZXJlICYgMHhmZmZmO1xuXG4gICAgICAgICAgICBpZiAoKGhlcmVfYml0cykgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgICAgLy8tLS0gUFVMTEJZVEUoKSAtLS0vL1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhlcmVfdmFsIDwgMTYpIHtcbiAgICAgICAgICAgIC8vLS0tIERST1BCSVRTKGhlcmUuYml0cykgLS0tLy9cbiAgICAgICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICAgIHN0YXRlLmxlbnNbc3RhdGUuaGF2ZSsrXSA9IGhlcmVfdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoZXJlX3ZhbCA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgLy89PT0gTkVFREJJVFMoaGVyZS5iaXRzICsgMik7XG4gICAgICAgICAgICAgIG4gPSBoZXJlX2JpdHMgKyAyO1xuICAgICAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBpZiAoc3RhdGUuaGF2ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgYml0IGxlbmd0aCByZXBlYXQnO1xuICAgICAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGVuID0gc3RhdGUubGVuc1tzdGF0ZS5oYXZlIC0gMV07XG4gICAgICAgICAgICAgIGNvcHkgPSAzICsgKGhvbGQgJiAweDAzKTsvL0JJVFMoMik7XG4gICAgICAgICAgICAgIC8vLS0tIERST1BCSVRTKDIpIC0tLS8vXG4gICAgICAgICAgICAgIGhvbGQgPj4+PSAyO1xuICAgICAgICAgICAgICBiaXRzIC09IDI7XG4gICAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhlcmVfdmFsID09PSAxNykge1xuICAgICAgICAgICAgICAvLz09PSBORUVEQklUUyhoZXJlLmJpdHMgKyAzKTtcbiAgICAgICAgICAgICAgbiA9IGhlcmVfYml0cyArIDM7XG4gICAgICAgICAgICAgIHdoaWxlIChiaXRzIDwgbikge1xuICAgICAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy89PT0vL1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAgIGJpdHMgLT0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgIGNvcHkgPSAzICsgKGhvbGQgJiAweDA3KTsvL0JJVFMoMyk7XG4gICAgICAgICAgICAgIC8vLS0tIERST1BCSVRTKDMpIC0tLS8vXG4gICAgICAgICAgICAgIGhvbGQgPj4+PSAzO1xuICAgICAgICAgICAgICBiaXRzIC09IDM7XG4gICAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAvLz09PSBORUVEQklUUyhoZXJlLmJpdHMgKyA3KTtcbiAgICAgICAgICAgICAgbiA9IGhlcmVfYml0cyArIDc7XG4gICAgICAgICAgICAgIHdoaWxlIChiaXRzIDwgbikge1xuICAgICAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy89PT0vL1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAgIGJpdHMgLT0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICAgIGxlbiA9IDA7XG4gICAgICAgICAgICAgIGNvcHkgPSAxMSArIChob2xkICYgMHg3Zik7Ly9CSVRTKDcpO1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUyg3KSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gNztcbiAgICAgICAgICAgICAgYml0cyAtPSA3O1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUuaGF2ZSArIGNvcHkgPiBzdGF0ZS5ubGVuICsgc3RhdGUubmRpc3QpIHtcbiAgICAgICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdCc7XG4gICAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNvcHktLSkge1xuICAgICAgICAgICAgICBzdGF0ZS5sZW5zW3N0YXRlLmhhdmUrK10gPSBsZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogaGFuZGxlIGVycm9yIGJyZWFrcyBpbiB3aGlsZSAqL1xuICAgICAgICBpZiAoc3RhdGUubW9kZSA9PT0gQkFEKSB7IGJyZWFrOyB9XG5cbiAgICAgICAgLyogY2hlY2sgZm9yIGVuZC1vZi1ibG9jayBjb2RlIChiZXR0ZXIgaGF2ZSBvbmUpICovXG4gICAgICAgIGlmIChzdGF0ZS5sZW5zWzI1Nl0gPT09IDApIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2snO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBidWlsZCBjb2RlIHRhYmxlcyAtLSBub3RlOiBkbyBub3QgY2hhbmdlIHRoZSBsZW5iaXRzIG9yIGRpc3RiaXRzXG4gICAgICAgICAgIHZhbHVlcyBoZXJlICg5IGFuZCA2KSB3aXRob3V0IHJlYWRpbmcgdGhlIGNvbW1lbnRzIGluIGluZnRyZWVzLmhcbiAgICAgICAgICAgY29uY2VybmluZyB0aGUgRU5PVUdIIGNvbnN0YW50cywgd2hpY2ggZGVwZW5kIG9uIHRob3NlIHZhbHVlcyAqL1xuICAgICAgICBzdGF0ZS5sZW5iaXRzID0gOTtcblxuICAgICAgICBvcHRzID0geyBiaXRzOiBzdGF0ZS5sZW5iaXRzIH07XG4gICAgICAgIHJldCA9IGluZmxhdGVfdGFibGUoTEVOUywgc3RhdGUubGVucywgMCwgc3RhdGUubmxlbiwgc3RhdGUubGVuY29kZSwgMCwgc3RhdGUud29yaywgb3B0cyk7XG4gICAgICAgIC8vIFdlIGhhdmUgc2VwYXJhdGUgdGFibGVzICYgbm8gcG9pbnRlcnMuIDIgY29tbWVudGVkIGxpbmVzIGJlbG93IG5vdCBuZWVkZWQuXG4gICAgICAgIC8vIHN0YXRlLm5leHRfaW5kZXggPSBvcHRzLnRhYmxlX2luZGV4O1xuICAgICAgICBzdGF0ZS5sZW5iaXRzID0gb3B0cy5iaXRzO1xuICAgICAgICAvLyBzdGF0ZS5sZW5jb2RlID0gc3RhdGUubmV4dDtcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUuZGlzdGJpdHMgPSA2O1xuICAgICAgICAvL3N0YXRlLmRpc3Rjb2RlLmNvcHkoc3RhdGUuY29kZXMpO1xuICAgICAgICAvLyBTd2l0Y2ggdG8gdXNlIGR5bmFtaWMgdGFibGVcbiAgICAgICAgc3RhdGUuZGlzdGNvZGUgPSBzdGF0ZS5kaXN0ZHluO1xuICAgICAgICBvcHRzID0geyBiaXRzOiBzdGF0ZS5kaXN0Yml0cyB9O1xuICAgICAgICByZXQgPSBpbmZsYXRlX3RhYmxlKERJU1RTLCBzdGF0ZS5sZW5zLCBzdGF0ZS5ubGVuLCBzdGF0ZS5uZGlzdCwgc3RhdGUuZGlzdGNvZGUsIDAsIHN0YXRlLndvcmssIG9wdHMpO1xuICAgICAgICAvLyBXZSBoYXZlIHNlcGFyYXRlIHRhYmxlcyAmIG5vIHBvaW50ZXJzLiAyIGNvbW1lbnRlZCBsaW5lcyBiZWxvdyBub3QgbmVlZGVkLlxuICAgICAgICAvLyBzdGF0ZS5uZXh0X2luZGV4ID0gb3B0cy50YWJsZV9pbmRleDtcbiAgICAgICAgc3RhdGUuZGlzdGJpdHMgPSBvcHRzLmJpdHM7XG4gICAgICAgIC8vIHN0YXRlLmRpc3Rjb2RlID0gc3RhdGUubmV4dDtcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZXMgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vVHJhY2V2KChzdGRlcnIsICdpbmZsYXRlOiAgICAgICBjb2RlcyBva1xcbicpKTtcbiAgICAgICAgc3RhdGUubW9kZSA9IExFTl87XG4gICAgICAgIGlmIChmbHVzaCA9PT0gWl9UUkVFUykgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU5fOlxuICAgICAgICBzdGF0ZS5tb2RlID0gTEVOO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIExFTjpcbiAgICAgICAgaWYgKGhhdmUgPj0gNiAmJiBsZWZ0ID49IDI1OCkge1xuICAgICAgICAgIC8vLS0tIFJFU1RPUkUoKSAtLS1cbiAgICAgICAgICBzdHJtLm5leHRfb3V0ID0gcHV0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfb3V0ID0gbGVmdDtcbiAgICAgICAgICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfaW4gPSBoYXZlO1xuICAgICAgICAgIHN0YXRlLmhvbGQgPSBob2xkO1xuICAgICAgICAgIHN0YXRlLmJpdHMgPSBiaXRzO1xuICAgICAgICAgIC8vLS0tXG4gICAgICAgICAgaW5mbGF0ZV9mYXN0KHN0cm0sIF9vdXQpO1xuICAgICAgICAgIC8vLS0tIExPQUQoKSAtLS1cbiAgICAgICAgICBwdXQgPSBzdHJtLm5leHRfb3V0O1xuICAgICAgICAgIG91dHB1dCA9IHN0cm0ub3V0cHV0O1xuICAgICAgICAgIGxlZnQgPSBzdHJtLmF2YWlsX291dDtcbiAgICAgICAgICBuZXh0ID0gc3RybS5uZXh0X2luO1xuICAgICAgICAgIGlucHV0ID0gc3RybS5pbnB1dDtcbiAgICAgICAgICBoYXZlID0gc3RybS5hdmFpbF9pbjtcbiAgICAgICAgICBob2xkID0gc3RhdGUuaG9sZDtcbiAgICAgICAgICBiaXRzID0gc3RhdGUuYml0cztcbiAgICAgICAgICAvLy0tLVxuXG4gICAgICAgICAgaWYgKHN0YXRlLm1vZGUgPT09IFRZUEUpIHtcbiAgICAgICAgICAgIHN0YXRlLmJhY2sgPSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuYmFjayA9IDA7XG4gICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICBoZXJlID0gc3RhdGUubGVuY29kZVtob2xkICYgKCgxIDw8IHN0YXRlLmxlbmJpdHMpIC0gMSldOyAgLypCSVRTKHN0YXRlLmxlbmJpdHMpKi9cbiAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICBoZXJlX29wID0gKGhlcmUgPj4+IDE2KSAmIDB4ZmY7XG4gICAgICAgICAgaGVyZV92YWwgPSBoZXJlICYgMHhmZmZmO1xuXG4gICAgICAgICAgaWYgKGhlcmVfYml0cyA8PSBiaXRzKSB7IGJyZWFrOyB9XG4gICAgICAgICAgLy8tLS0gUFVMTEJZVEUoKSAtLS0vL1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZXJlX29wICYmIChoZXJlX29wICYgMHhmMCkgPT09IDApIHtcbiAgICAgICAgICBsYXN0X2JpdHMgPSBoZXJlX2JpdHM7XG4gICAgICAgICAgbGFzdF9vcCA9IGhlcmVfb3A7XG4gICAgICAgICAgbGFzdF92YWwgPSBoZXJlX3ZhbDtcbiAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBoZXJlID0gc3RhdGUubGVuY29kZVtsYXN0X3ZhbCArXG4gICAgICAgICAgICAgICAgICAgICgoaG9sZCAmICgoMSA8PCAobGFzdF9iaXRzICsgbGFzdF9vcCkpIC0gMSkpLypCSVRTKGxhc3QuYml0cyArIGxhc3Qub3ApKi8gPj4gbGFzdF9iaXRzKV07XG4gICAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgICAgaWYgKChsYXN0X2JpdHMgKyBoZXJlX2JpdHMpIDw9IGJpdHMpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vLS0tIERST1BCSVRTKGxhc3QuYml0cykgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gbGFzdF9iaXRzO1xuICAgICAgICAgIGJpdHMgLT0gbGFzdF9iaXRzO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IGxhc3RfYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgIGJpdHMgLT0gaGVyZV9iaXRzO1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIHN0YXRlLmJhY2sgKz0gaGVyZV9iaXRzO1xuICAgICAgICBzdGF0ZS5sZW5ndGggPSBoZXJlX3ZhbDtcbiAgICAgICAgaWYgKGhlcmVfb3AgPT09IDApIHtcbiAgICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgaGVyZS52YWwgPj0gMHgyMCAmJiBoZXJlLnZhbCA8IDB4N2YgP1xuICAgICAgICAgIC8vICAgICAgICBcImluZmxhdGU6ICAgICAgICAgbGl0ZXJhbCAnJWMnXFxuXCIgOlxuICAgICAgICAgIC8vICAgICAgICBcImluZmxhdGU6ICAgICAgICAgbGl0ZXJhbCAweCUwMnhcXG5cIiwgaGVyZS52YWwpKTtcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gTElUO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZXJlX29wICYgMzIpIHtcbiAgICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGVuZCBvZiBibG9ja1xcblwiKSk7XG4gICAgICAgICAgc3RhdGUuYmFjayA9IC0xO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZXJlX29wICYgNjQpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuZXh0cmEgPSBoZXJlX29wICYgMTU7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU5FWFQ7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTEVORVhUOlxuICAgICAgICBpZiAoc3RhdGUuZXh0cmEpIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUyhzdGF0ZS5leHRyYSk7XG4gICAgICAgICAgbiA9IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgbikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIHN0YXRlLmxlbmd0aCArPSBob2xkICYgKCgxIDw8IHN0YXRlLmV4dHJhKSAtIDEpLypCSVRTKHN0YXRlLmV4dHJhKSovO1xuICAgICAgICAgIC8vLS0tIERST1BCSVRTKHN0YXRlLmV4dHJhKSAtLS0vL1xuICAgICAgICAgIGhvbGQgPj4+PSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICBiaXRzIC09IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IHN0YXRlLmV4dHJhO1xuICAgICAgICB9XG4gICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgICAgbGVuZ3RoICV1XFxuXCIsIHN0YXRlLmxlbmd0aCkpO1xuICAgICAgICBzdGF0ZS53YXMgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBESVNUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIERJU1Q6XG4gICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICBoZXJlID0gc3RhdGUuZGlzdGNvZGVbaG9sZCAmICgoMSA8PCBzdGF0ZS5kaXN0Yml0cykgLSAxKV07LypCSVRTKHN0YXRlLmRpc3RiaXRzKSovXG4gICAgICAgICAgaGVyZV9iaXRzID0gaGVyZSA+Pj4gMjQ7XG4gICAgICAgICAgaGVyZV9vcCA9IChoZXJlID4+PiAxNikgJiAweGZmO1xuICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgIGlmICgoaGVyZV9iaXRzKSA8PSBiaXRzKSB7IGJyZWFrOyB9XG4gICAgICAgICAgLy8tLS0gUFVMTEJZVEUoKSAtLS0vL1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICB9XG4gICAgICAgIGlmICgoaGVyZV9vcCAmIDB4ZjApID09PSAwKSB7XG4gICAgICAgICAgbGFzdF9iaXRzID0gaGVyZV9iaXRzO1xuICAgICAgICAgIGxhc3Rfb3AgPSBoZXJlX29wO1xuICAgICAgICAgIGxhc3RfdmFsID0gaGVyZV92YWw7XG4gICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgaGVyZSA9IHN0YXRlLmRpc3Rjb2RlW2xhc3RfdmFsICtcbiAgICAgICAgICAgICAgICAgICAgKChob2xkICYgKCgxIDw8IChsYXN0X2JpdHMgKyBsYXN0X29wKSkgLSAxKSkvKkJJVFMobGFzdC5iaXRzICsgbGFzdC5vcCkqLyA+PiBsYXN0X2JpdHMpXTtcbiAgICAgICAgICAgIGhlcmVfYml0cyA9IGhlcmUgPj4+IDI0O1xuICAgICAgICAgICAgaGVyZV9vcCA9IChoZXJlID4+PiAxNikgJiAweGZmO1xuICAgICAgICAgICAgaGVyZV92YWwgPSBoZXJlICYgMHhmZmZmO1xuXG4gICAgICAgICAgICBpZiAoKGxhc3RfYml0cyArIGhlcmVfYml0cykgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgICAgLy8tLS0gUFVMTEJZVEUoKSAtLS0vL1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8tLS0gRFJPUEJJVFMobGFzdC5iaXRzKSAtLS0vL1xuICAgICAgICAgIGhvbGQgPj4+PSBsYXN0X2JpdHM7XG4gICAgICAgICAgYml0cyAtPSBsYXN0X2JpdHM7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIHN0YXRlLmJhY2sgKz0gbGFzdF9iaXRzO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tIERST1BCSVRTKGhlcmUuYml0cykgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IGhlcmVfYml0cztcbiAgICAgICAgYml0cyAtPSBoZXJlX2JpdHM7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgc3RhdGUuYmFjayArPSBoZXJlX2JpdHM7XG4gICAgICAgIGlmIChoZXJlX29wICYgNjQpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGRpc3RhbmNlIGNvZGUnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUub2Zmc2V0ID0gaGVyZV92YWw7XG4gICAgICAgIHN0YXRlLmV4dHJhID0gKGhlcmVfb3ApICYgMTU7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBESVNURVhUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIERJU1RFWFQ6XG4gICAgICAgIGlmIChzdGF0ZS5leHRyYSkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKHN0YXRlLmV4dHJhKTtcbiAgICAgICAgICBuID0gc3RhdGUuZXh0cmE7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCBuKSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUub2Zmc2V0ICs9IGhvbGQgJiAoKDEgPDwgc3RhdGUuZXh0cmEpIC0gMSkvKkJJVFMoc3RhdGUuZXh0cmEpKi87XG4gICAgICAgICAgLy8tLS0gRFJPUEJJVFMoc3RhdGUuZXh0cmEpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIGJpdHMgLT0gc3RhdGUuZXh0cmE7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIHN0YXRlLmJhY2sgKz0gc3RhdGUuZXh0cmE7XG4gICAgICAgIH1cbi8vI2lmZGVmIElORkxBVEVfU1RSSUNUXG4gICAgICAgIGlmIChzdGF0ZS5vZmZzZXQgPiBzdGF0ZS5kbWF4KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2snO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbi8vI2VuZGlmXG4gICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgICAgZGlzdGFuY2UgJXVcXG5cIiwgc3RhdGUub2Zmc2V0KSk7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBNQVRDSDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBNQVRDSDpcbiAgICAgICAgaWYgKGxlZnQgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIGNvcHkgPSBfb3V0IC0gbGVmdDtcbiAgICAgICAgaWYgKHN0YXRlLm9mZnNldCA+IGNvcHkpIHsgICAgICAgICAvKiBjb3B5IGZyb20gd2luZG93ICovXG4gICAgICAgICAgY29weSA9IHN0YXRlLm9mZnNldCAtIGNvcHk7XG4gICAgICAgICAgaWYgKGNvcHkgPiBzdGF0ZS53aGF2ZSkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLnNhbmUpIHtcbiAgICAgICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2snO1xuICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbi8vICghKSBUaGlzIGJsb2NrIGlzIGRpc2FibGVkIGluIHpsaWIgZGVmYXVsdHMsXG4vLyBkb24ndCBlbmFibGUgaXQgZm9yIGJpbmFyeSBjb21wYXRpYmlsaXR5XG4vLyNpZmRlZiBJTkZMQVRFX0FMTE9XX0lOVkFMSURfRElTVEFOQ0VfVE9PRkFSX0FSUlJcbi8vICAgICAgICAgIFRyYWNlKChzdGRlcnIsIFwiaW5mbGF0ZS5jIHRvbyBmYXJcXG5cIikpO1xuLy8gICAgICAgICAgY29weSAtPSBzdGF0ZS53aGF2ZTtcbi8vICAgICAgICAgIGlmIChjb3B5ID4gc3RhdGUubGVuZ3RoKSB7IGNvcHkgPSBzdGF0ZS5sZW5ndGg7IH1cbi8vICAgICAgICAgIGlmIChjb3B5ID4gbGVmdCkgeyBjb3B5ID0gbGVmdDsgfVxuLy8gICAgICAgICAgbGVmdCAtPSBjb3B5O1xuLy8gICAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4vLyAgICAgICAgICBkbyB7XG4vLyAgICAgICAgICAgIG91dHB1dFtwdXQrK10gPSAwO1xuLy8gICAgICAgICAgfSB3aGlsZSAoLS1jb3B5KTtcbi8vICAgICAgICAgIGlmIChzdGF0ZS5sZW5ndGggPT09IDApIHsgc3RhdGUubW9kZSA9IExFTjsgfVxuLy8gICAgICAgICAgYnJlYWs7XG4vLyNlbmRpZlxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29weSA+IHN0YXRlLnduZXh0KSB7XG4gICAgICAgICAgICBjb3B5IC09IHN0YXRlLnduZXh0O1xuICAgICAgICAgICAgZnJvbSA9IHN0YXRlLndzaXplIC0gY29weTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmcm9tID0gc3RhdGUud25leHQgLSBjb3B5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29weSA+IHN0YXRlLmxlbmd0aCkgeyBjb3B5ID0gc3RhdGUubGVuZ3RoOyB9XG4gICAgICAgICAgZnJvbV9zb3VyY2UgPSBzdGF0ZS53aW5kb3c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogY29weSBmcm9tIG91dHB1dCAqL1xuICAgICAgICAgIGZyb21fc291cmNlID0gb3V0cHV0O1xuICAgICAgICAgIGZyb20gPSBwdXQgLSBzdGF0ZS5vZmZzZXQ7XG4gICAgICAgICAgY29weSA9IHN0YXRlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29weSA+IGxlZnQpIHsgY29weSA9IGxlZnQ7IH1cbiAgICAgICAgbGVmdCAtPSBjb3B5O1xuICAgICAgICBzdGF0ZS5sZW5ndGggLT0gY29weTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG91dHB1dFtwdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICB9IHdoaWxlICgtLWNvcHkpO1xuICAgICAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7IHN0YXRlLm1vZGUgPSBMRU47IH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIExJVDpcbiAgICAgICAgaWYgKGxlZnQgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIG91dHB1dFtwdXQrK10gPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgIGxlZnQtLTtcbiAgICAgICAgc3RhdGUubW9kZSA9IExFTjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENIRUNLOlxuICAgICAgICBpZiAoc3RhdGUud3JhcCkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKDMyKTtcbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDMyKSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIC8vIFVzZSAnfCcgaW5zdGVhZCBvZiAnKycgdG8gbWFrZSBzdXJlIHRoYXQgcmVzdWx0IGlzIHNpZ25lZFxuICAgICAgICAgICAgaG9sZCB8PSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBfb3V0IC09IGxlZnQ7XG4gICAgICAgICAgc3RybS50b3RhbF9vdXQgKz0gX291dDtcbiAgICAgICAgICBzdGF0ZS50b3RhbCArPSBfb3V0O1xuICAgICAgICAgIGlmIChfb3V0KSB7XG4gICAgICAgICAgICBzdHJtLmFkbGVyID0gc3RhdGUuY2hlY2sgPVxuICAgICAgICAgICAgICAgIC8qVVBEQVRFKHN0YXRlLmNoZWNrLCBwdXQgLSBfb3V0LCBfb3V0KTsqL1xuICAgICAgICAgICAgICAgIChzdGF0ZS5mbGFncyA/IGNyYzMyKHN0YXRlLmNoZWNrLCBvdXRwdXQsIF9vdXQsIHB1dCAtIF9vdXQpIDogYWRsZXIzMihzdGF0ZS5jaGVjaywgb3V0cHV0LCBfb3V0LCBwdXQgLSBfb3V0KSk7XG5cbiAgICAgICAgICB9XG4gICAgICAgICAgX291dCA9IGxlZnQ7XG4gICAgICAgICAgLy8gTkI6IGNyYzMyIHN0b3JlZCBhcyBzaWduZWQgMzItYml0IGludCwgenN3YXAzMiByZXR1cm5zIHNpZ25lZCB0b29cbiAgICAgICAgICBpZiAoKHN0YXRlLmZsYWdzID8gaG9sZCA6IHpzd2FwMzIoaG9sZCkpICE9PSBzdGF0ZS5jaGVjaykge1xuICAgICAgICAgICAgc3RybS5tc2cgPSAnaW5jb3JyZWN0IGRhdGEgY2hlY2snO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgY2hlY2sgbWF0Y2hlcyB0cmFpbGVyXFxuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5tb2RlID0gTEVOR1RIO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIExFTkdUSDpcbiAgICAgICAgaWYgKHN0YXRlLndyYXAgJiYgc3RhdGUuZmxhZ3MpIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUygzMik7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCAzMikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIGlmIChob2xkICE9PSAoc3RhdGUudG90YWwgJiAweGZmZmZmZmZmKSkge1xuICAgICAgICAgICAgc3RybS5tc2cgPSAnaW5jb3JyZWN0IGxlbmd0aCBjaGVjayc7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICBsZW5ndGggbWF0Y2hlcyB0cmFpbGVyXFxuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5tb2RlID0gRE9ORTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBET05FOlxuICAgICAgICByZXQgPSBaX1NUUkVBTV9FTkQ7XG4gICAgICAgIGJyZWFrIGluZl9sZWF2ZTtcbiAgICAgIGNhc2UgQkFEOlxuICAgICAgICByZXQgPSBaX0RBVEFfRVJST1I7XG4gICAgICAgIGJyZWFrIGluZl9sZWF2ZTtcbiAgICAgIGNhc2UgTUVNOlxuICAgICAgICByZXR1cm4gWl9NRU1fRVJST1I7XG4gICAgICBjYXNlIFNZTkM6XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgICB9XG4gIH1cblxuICAvLyBpbmZfbGVhdmUgPC0gaGVyZSBpcyByZWFsIHBsYWNlIGZvciBcImdvdG8gaW5mX2xlYXZlXCIsIGVtdWxhdGVkIHZpYSBcImJyZWFrIGluZl9sZWF2ZVwiXG5cbiAgLypcbiAgICAgUmV0dXJuIGZyb20gaW5mbGF0ZSgpLCB1cGRhdGluZyB0aGUgdG90YWwgY291bnRzIGFuZCB0aGUgY2hlY2sgdmFsdWUuXG4gICAgIElmIHRoZXJlIHdhcyBubyBwcm9ncmVzcyBkdXJpbmcgdGhlIGluZmxhdGUoKSBjYWxsLCByZXR1cm4gYSBidWZmZXJcbiAgICAgZXJyb3IuICBDYWxsIHVwZGF0ZXdpbmRvdygpIHRvIGNyZWF0ZSBhbmQvb3IgdXBkYXRlIHRoZSB3aW5kb3cgc3RhdGUuXG4gICAgIE5vdGU6IGEgbWVtb3J5IGVycm9yIGZyb20gaW5mbGF0ZSgpIGlzIG5vbi1yZWNvdmVyYWJsZS5cbiAgICovXG5cbiAgLy8tLS0gUkVTVE9SRSgpIC0tLVxuICBzdHJtLm5leHRfb3V0ID0gcHV0O1xuICBzdHJtLmF2YWlsX291dCA9IGxlZnQ7XG4gIHN0cm0ubmV4dF9pbiA9IG5leHQ7XG4gIHN0cm0uYXZhaWxfaW4gPSBoYXZlO1xuICBzdGF0ZS5ob2xkID0gaG9sZDtcbiAgc3RhdGUuYml0cyA9IGJpdHM7XG4gIC8vLS0tXG5cbiAgaWYgKHN0YXRlLndzaXplIHx8IChfb3V0ICE9PSBzdHJtLmF2YWlsX291dCAmJiBzdGF0ZS5tb2RlIDwgQkFEICYmXG4gICAgICAgICAgICAgICAgICAgICAgKHN0YXRlLm1vZGUgPCBDSEVDSyB8fCBmbHVzaCAhPT0gWl9GSU5JU0gpKSkge1xuICAgIGlmICh1cGRhdGV3aW5kb3coc3RybSwgc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQsIF9vdXQgLSBzdHJtLmF2YWlsX291dCkpIHtcbiAgICAgIHN0YXRlLm1vZGUgPSBNRU07XG4gICAgICByZXR1cm4gWl9NRU1fRVJST1I7XG4gICAgfVxuICB9XG4gIF9pbiAtPSBzdHJtLmF2YWlsX2luO1xuICBfb3V0IC09IHN0cm0uYXZhaWxfb3V0O1xuICBzdHJtLnRvdGFsX2luICs9IF9pbjtcbiAgc3RybS50b3RhbF9vdXQgKz0gX291dDtcbiAgc3RhdGUudG90YWwgKz0gX291dDtcbiAgaWYgKHN0YXRlLndyYXAgJiYgX291dCkge1xuICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS5jaGVjayA9IC8qVVBEQVRFKHN0YXRlLmNoZWNrLCBzdHJtLm5leHRfb3V0IC0gX291dCwgX291dCk7Ki9cbiAgICAgIChzdGF0ZS5mbGFncyA/IGNyYzMyKHN0YXRlLmNoZWNrLCBvdXRwdXQsIF9vdXQsIHN0cm0ubmV4dF9vdXQgLSBfb3V0KSA6IGFkbGVyMzIoc3RhdGUuY2hlY2ssIG91dHB1dCwgX291dCwgc3RybS5uZXh0X291dCAtIF9vdXQpKTtcbiAgfVxuICBzdHJtLmRhdGFfdHlwZSA9IHN0YXRlLmJpdHMgKyAoc3RhdGUubGFzdCA/IDY0IDogMCkgK1xuICAgICAgICAgICAgICAgICAgICAoc3RhdGUubW9kZSA9PT0gVFlQRSA/IDEyOCA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKHN0YXRlLm1vZGUgPT09IExFTl8gfHwgc3RhdGUubW9kZSA9PT0gQ09QWV8gPyAyNTYgOiAwKTtcbiAgaWYgKCgoX2luID09PSAwICYmIF9vdXQgPT09IDApIHx8IGZsdXNoID09PSBaX0ZJTklTSCkgJiYgcmV0ID09PSBaX09LKSB7XG4gICAgcmV0ID0gWl9CVUZfRVJST1I7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZUVuZChzdHJtKSB7XG5cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlIC8qfHwgc3RybS0+emZyZWUgPT0gKGZyZWVfZnVuYykwKi8pIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICB2YXIgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBpZiAoc3RhdGUud2luZG93KSB7XG4gICAgc3RhdGUud2luZG93ID0gbnVsbDtcbiAgfVxuICBzdHJtLnN0YXRlID0gbnVsbDtcbiAgcmV0dXJuIFpfT0s7XG59XG5cbmZ1bmN0aW9uIGluZmxhdGVHZXRIZWFkZXIoc3RybSwgaGVhZCkge1xuICB2YXIgc3RhdGU7XG5cbiAgLyogY2hlY2sgc3RhdGUgKi9cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG4gIGlmICgoc3RhdGUud3JhcCAmIDIpID09PSAwKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuXG4gIC8qIHNhdmUgaGVhZGVyIHN0cnVjdHVyZSAqL1xuICBzdGF0ZS5oZWFkID0gaGVhZDtcbiAgaGVhZC5kb25lID0gZmFsc2U7XG4gIHJldHVybiBaX09LO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlU2V0RGljdGlvbmFyeShzdHJtLCBkaWN0aW9uYXJ5KSB7XG4gIHZhciBkaWN0TGVuZ3RoID0gZGljdGlvbmFyeS5sZW5ndGg7XG5cbiAgdmFyIHN0YXRlO1xuICB2YXIgZGljdGlkO1xuICB2YXIgcmV0O1xuXG4gIC8qIGNoZWNrIHN0YXRlICovXG4gIGlmICghc3RybSAvKiA9PSBaX05VTEwgKi8gfHwgIXN0cm0uc3RhdGUgLyogPT0gWl9OVUxMICovKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG5cbiAgaWYgKHN0YXRlLndyYXAgIT09IDAgJiYgc3RhdGUubW9kZSAhPT0gRElDVCkge1xuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuXG4gIC8qIGNoZWNrIGZvciBjb3JyZWN0IGRpY3Rpb25hcnkgaWRlbnRpZmllciAqL1xuICBpZiAoc3RhdGUubW9kZSA9PT0gRElDVCkge1xuICAgIGRpY3RpZCA9IDE7IC8qIGFkbGVyMzIoMCwgbnVsbCwgMCkqL1xuICAgIC8qIGRpY3RpZCA9IGFkbGVyMzIoZGljdGlkLCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoKTsgKi9cbiAgICBkaWN0aWQgPSBhZGxlcjMyKGRpY3RpZCwgZGljdGlvbmFyeSwgZGljdExlbmd0aCwgMCk7XG4gICAgaWYgKGRpY3RpZCAhPT0gc3RhdGUuY2hlY2spIHtcbiAgICAgIHJldHVybiBaX0RBVEFfRVJST1I7XG4gICAgfVxuICB9XG4gIC8qIGNvcHkgZGljdGlvbmFyeSB0byB3aW5kb3cgdXNpbmcgdXBkYXRld2luZG93KCksIHdoaWNoIHdpbGwgYW1lbmQgdGhlXG4gICBleGlzdGluZyBkaWN0aW9uYXJ5IGlmIGFwcHJvcHJpYXRlICovXG4gIHJldCA9IHVwZGF0ZXdpbmRvdyhzdHJtLCBkaWN0aW9uYXJ5LCBkaWN0TGVuZ3RoLCBkaWN0TGVuZ3RoKTtcbiAgaWYgKHJldCkge1xuICAgIHN0YXRlLm1vZGUgPSBNRU07XG4gICAgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICB9XG4gIHN0YXRlLmhhdmVkaWN0ID0gMTtcbiAgLy8gVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICBkaWN0aW9uYXJ5IHNldFxcblwiKSk7XG4gIHJldHVybiBaX09LO1xufVxuXG5leHBvcnRzLmluZmxhdGVSZXNldCA9IGluZmxhdGVSZXNldDtcbmV4cG9ydHMuaW5mbGF0ZVJlc2V0MiA9IGluZmxhdGVSZXNldDI7XG5leHBvcnRzLmluZmxhdGVSZXNldEtlZXAgPSBpbmZsYXRlUmVzZXRLZWVwO1xuZXhwb3J0cy5pbmZsYXRlSW5pdCA9IGluZmxhdGVJbml0O1xuZXhwb3J0cy5pbmZsYXRlSW5pdDIgPSBpbmZsYXRlSW5pdDI7XG5leHBvcnRzLmluZmxhdGUgPSBpbmZsYXRlO1xuZXhwb3J0cy5pbmZsYXRlRW5kID0gaW5mbGF0ZUVuZDtcbmV4cG9ydHMuaW5mbGF0ZUdldEhlYWRlciA9IGluZmxhdGVHZXRIZWFkZXI7XG5leHBvcnRzLmluZmxhdGVTZXREaWN0aW9uYXJ5ID0gaW5mbGF0ZVNldERpY3Rpb25hcnk7XG5leHBvcnRzLmluZmxhdGVJbmZvID0gJ3Bha28gaW5mbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdCknO1xuXG4vKiBOb3QgaW1wbGVtZW50ZWRcbmV4cG9ydHMuaW5mbGF0ZUNvcHkgPSBpbmZsYXRlQ29weTtcbmV4cG9ydHMuaW5mbGF0ZUdldERpY3Rpb25hcnkgPSBpbmZsYXRlR2V0RGljdGlvbmFyeTtcbmV4cG9ydHMuaW5mbGF0ZU1hcmsgPSBpbmZsYXRlTWFyaztcbmV4cG9ydHMuaW5mbGF0ZVByaW1lID0gaW5mbGF0ZVByaW1lO1xuZXhwb3J0cy5pbmZsYXRlU3luYyA9IGluZmxhdGVTeW5jO1xuZXhwb3J0cy5pbmZsYXRlU3luY1BvaW50ID0gaW5mbGF0ZVN5bmNQb2ludDtcbmV4cG9ydHMuaW5mbGF0ZVVuZGVybWluZSA9IGluZmxhdGVVbmRlcm1pbmU7XG4qL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAoQykgMTk5NS0yMDEzIEplYW4tbG91cCBHYWlsbHkgYW5kIE1hcmsgQWRsZXJcbi8vIChDKSAyMDE0LTIwMTcgVml0YWx5IFB1enJpbiBhbmQgQW5kcmV5IFR1cGl0c2luXG4vL1xuLy8gVGhpcyBzb2Z0d2FyZSBpcyBwcm92aWRlZCAnYXMtaXMnLCB3aXRob3V0IGFueSBleHByZXNzIG9yIGltcGxpZWRcbi8vIHdhcnJhbnR5LiBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlc1xuLy8gYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSxcbi8vIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucywgYW5kIHRvIGFsdGVyIGl0IGFuZCByZWRpc3RyaWJ1dGUgaXRcbi8vIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczpcbi8vXG4vLyAxLiBUaGUgb3JpZ2luIG9mIHRoaXMgc29mdHdhcmUgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdFxuLy8gICBjbGFpbSB0aGF0IHlvdSB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpcyBzb2Z0d2FyZVxuLy8gICBpbiBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmVcbi8vICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC5cbi8vIDIuIEFsdGVyZWQgc291cmNlIHZlcnNpb25zIG11c3QgYmUgcGxhaW5seSBtYXJrZWQgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlXG4vLyAgIG1pc3JlcHJlc2VudGVkIGFzIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbi8vIDMuIFRoaXMgbm90aWNlIG1heSBub3QgYmUgcmVtb3ZlZCBvciBhbHRlcmVkIGZyb20gYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NvbW1vbicpO1xuXG52YXIgTUFYQklUUyA9IDE1O1xudmFyIEVOT1VHSF9MRU5TID0gODUyO1xudmFyIEVOT1VHSF9ESVNUUyA9IDU5Mjtcbi8vdmFyIEVOT1VHSCA9IChFTk9VR0hfTEVOUytFTk9VR0hfRElTVFMpO1xuXG52YXIgQ09ERVMgPSAwO1xudmFyIExFTlMgPSAxO1xudmFyIERJU1RTID0gMjtcblxudmFyIGxiYXNlID0gWyAvKiBMZW5ndGggY29kZXMgMjU3Li4yODUgYmFzZSAqL1xuICAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEzLCAxNSwgMTcsIDE5LCAyMywgMjcsIDMxLFxuICAzNSwgNDMsIDUxLCA1OSwgNjcsIDgzLCA5OSwgMTE1LCAxMzEsIDE2MywgMTk1LCAyMjcsIDI1OCwgMCwgMFxuXTtcblxudmFyIGxleHQgPSBbIC8qIExlbmd0aCBjb2RlcyAyNTcuLjI4NSBleHRyYSAqL1xuICAxNiwgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNiwgMTYsIDE3LCAxNywgMTcsIDE3LCAxOCwgMTgsIDE4LCAxOCxcbiAgMTksIDE5LCAxOSwgMTksIDIwLCAyMCwgMjAsIDIwLCAyMSwgMjEsIDIxLCAyMSwgMTYsIDcyLCA3OFxuXTtcblxudmFyIGRiYXNlID0gWyAvKiBEaXN0YW5jZSBjb2RlcyAwLi4yOSBiYXNlICovXG4gIDEsIDIsIDMsIDQsIDUsIDcsIDksIDEzLCAxNywgMjUsIDMzLCA0OSwgNjUsIDk3LCAxMjksIDE5MyxcbiAgMjU3LCAzODUsIDUxMywgNzY5LCAxMDI1LCAxNTM3LCAyMDQ5LCAzMDczLCA0MDk3LCA2MTQ1LFxuICA4MTkzLCAxMjI4OSwgMTYzODUsIDI0NTc3LCAwLCAwXG5dO1xuXG52YXIgZGV4dCA9IFsgLyogRGlzdGFuY2UgY29kZXMgMC4uMjkgZXh0cmEgKi9cbiAgMTYsIDE2LCAxNiwgMTYsIDE3LCAxNywgMTgsIDE4LCAxOSwgMTksIDIwLCAyMCwgMjEsIDIxLCAyMiwgMjIsXG4gIDIzLCAyMywgMjQsIDI0LCAyNSwgMjUsIDI2LCAyNiwgMjcsIDI3LFxuICAyOCwgMjgsIDI5LCAyOSwgNjQsIDY0XG5dO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluZmxhdGVfdGFibGUodHlwZSwgbGVucywgbGVuc19pbmRleCwgY29kZXMsIHRhYmxlLCB0YWJsZV9pbmRleCwgd29yaywgb3B0cylcbntcbiAgdmFyIGJpdHMgPSBvcHRzLmJpdHM7XG4gICAgICAvL2hlcmUgPSBvcHRzLmhlcmU7IC8qIHRhYmxlIGVudHJ5IGZvciBkdXBsaWNhdGlvbiAqL1xuXG4gIHZhciBsZW4gPSAwOyAgICAgICAgICAgICAgIC8qIGEgY29kZSdzIGxlbmd0aCBpbiBiaXRzICovXG4gIHZhciBzeW0gPSAwOyAgICAgICAgICAgICAgIC8qIGluZGV4IG9mIGNvZGUgc3ltYm9scyAqL1xuICB2YXIgbWluID0gMCwgbWF4ID0gMDsgICAgICAgICAgLyogbWluaW11bSBhbmQgbWF4aW11bSBjb2RlIGxlbmd0aHMgKi9cbiAgdmFyIHJvb3QgPSAwOyAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGluZGV4IGJpdHMgZm9yIHJvb3QgdGFibGUgKi9cbiAgdmFyIGN1cnIgPSAwOyAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGluZGV4IGJpdHMgZm9yIGN1cnJlbnQgdGFibGUgKi9cbiAgdmFyIGRyb3AgPSAwOyAgICAgICAgICAgICAgLyogY29kZSBiaXRzIHRvIGRyb3AgZm9yIHN1Yi10YWJsZSAqL1xuICB2YXIgbGVmdCA9IDA7ICAgICAgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBwcmVmaXggY29kZXMgYXZhaWxhYmxlICovXG4gIHZhciB1c2VkID0gMDsgICAgICAgICAgICAgIC8qIGNvZGUgZW50cmllcyBpbiB0YWJsZSB1c2VkICovXG4gIHZhciBodWZmID0gMDsgICAgICAgICAgICAgIC8qIEh1ZmZtYW4gY29kZSAqL1xuICB2YXIgaW5jcjsgICAgICAgICAgICAgIC8qIGZvciBpbmNyZW1lbnRpbmcgY29kZSwgaW5kZXggKi9cbiAgdmFyIGZpbGw7ICAgICAgICAgICAgICAvKiBpbmRleCBmb3IgcmVwbGljYXRpbmcgZW50cmllcyAqL1xuICB2YXIgbG93OyAgICAgICAgICAgICAgIC8qIGxvdyBiaXRzIGZvciBjdXJyZW50IHJvb3QgZW50cnkgKi9cbiAgdmFyIG1hc2s7ICAgICAgICAgICAgICAvKiBtYXNrIGZvciBsb3cgcm9vdCBiaXRzICovXG4gIHZhciBuZXh0OyAgICAgICAgICAgICAvKiBuZXh0IGF2YWlsYWJsZSBzcGFjZSBpbiB0YWJsZSAqL1xuICB2YXIgYmFzZSA9IG51bGw7ICAgICAvKiBiYXNlIHZhbHVlIHRhYmxlIHRvIHVzZSAqL1xuICB2YXIgYmFzZV9pbmRleCA9IDA7XG4vLyAgdmFyIHNob2V4dHJhOyAgICAvKiBleHRyYSBiaXRzIHRhYmxlIHRvIHVzZSAqL1xuICB2YXIgZW5kOyAgICAgICAgICAgICAgICAgICAgLyogdXNlIGJhc2UgYW5kIGV4dHJhIGZvciBzeW1ib2wgPiBlbmQgKi9cbiAgdmFyIGNvdW50ID0gbmV3IHV0aWxzLkJ1ZjE2KE1BWEJJVFMgKyAxKTsgLy9bTUFYQklUUysxXTsgICAgLyogbnVtYmVyIG9mIGNvZGVzIG9mIGVhY2ggbGVuZ3RoICovXG4gIHZhciBvZmZzID0gbmV3IHV0aWxzLkJ1ZjE2KE1BWEJJVFMgKyAxKTsgLy9bTUFYQklUUysxXTsgICAgIC8qIG9mZnNldHMgaW4gdGFibGUgZm9yIGVhY2ggbGVuZ3RoICovXG4gIHZhciBleHRyYSA9IG51bGw7XG4gIHZhciBleHRyYV9pbmRleCA9IDA7XG5cbiAgdmFyIGhlcmVfYml0cywgaGVyZV9vcCwgaGVyZV92YWw7XG5cbiAgLypcbiAgIFByb2Nlc3MgYSBzZXQgb2YgY29kZSBsZW5ndGhzIHRvIGNyZWF0ZSBhIGNhbm9uaWNhbCBIdWZmbWFuIGNvZGUuICBUaGVcbiAgIGNvZGUgbGVuZ3RocyBhcmUgbGVuc1swLi5jb2Rlcy0xXS4gIEVhY2ggbGVuZ3RoIGNvcnJlc3BvbmRzIHRvIHRoZVxuICAgc3ltYm9scyAwLi5jb2Rlcy0xLiAgVGhlIEh1ZmZtYW4gY29kZSBpcyBnZW5lcmF0ZWQgYnkgZmlyc3Qgc29ydGluZyB0aGVcbiAgIHN5bWJvbHMgYnkgbGVuZ3RoIGZyb20gc2hvcnQgdG8gbG9uZywgYW5kIHJldGFpbmluZyB0aGUgc3ltYm9sIG9yZGVyXG4gICBmb3IgY29kZXMgd2l0aCBlcXVhbCBsZW5ndGhzLiAgVGhlbiB0aGUgY29kZSBzdGFydHMgd2l0aCBhbGwgemVybyBiaXRzXG4gICBmb3IgdGhlIGZpcnN0IGNvZGUgb2YgdGhlIHNob3J0ZXN0IGxlbmd0aCwgYW5kIHRoZSBjb2RlcyBhcmUgaW50ZWdlclxuICAgaW5jcmVtZW50cyBmb3IgdGhlIHNhbWUgbGVuZ3RoLCBhbmQgemVyb3MgYXJlIGFwcGVuZGVkIGFzIHRoZSBsZW5ndGhcbiAgIGluY3JlYXNlcy4gIEZvciB0aGUgZGVmbGF0ZSBmb3JtYXQsIHRoZXNlIGJpdHMgYXJlIHN0b3JlZCBiYWNrd2FyZHNcbiAgIGZyb20gdGhlaXIgbW9yZSBuYXR1cmFsIGludGVnZXIgaW5jcmVtZW50IG9yZGVyaW5nLCBhbmQgc28gd2hlbiB0aGVcbiAgIGRlY29kaW5nIHRhYmxlcyBhcmUgYnVpbHQgaW4gdGhlIGxhcmdlIGxvb3AgYmVsb3csIHRoZSBpbnRlZ2VyIGNvZGVzXG4gICBhcmUgaW5jcmVtZW50ZWQgYmFja3dhcmRzLlxuXG4gICBUaGlzIHJvdXRpbmUgYXNzdW1lcywgYnV0IGRvZXMgbm90IGNoZWNrLCB0aGF0IGFsbCBvZiB0aGUgZW50cmllcyBpblxuICAgbGVuc1tdIGFyZSBpbiB0aGUgcmFuZ2UgMC4uTUFYQklUUy4gIFRoZSBjYWxsZXIgbXVzdCBhc3N1cmUgdGhpcy5cbiAgIDEuLk1BWEJJVFMgaXMgaW50ZXJwcmV0ZWQgYXMgdGhhdCBjb2RlIGxlbmd0aC4gIHplcm8gbWVhbnMgdGhhdCB0aGF0XG4gICBzeW1ib2wgZG9lcyBub3Qgb2NjdXIgaW4gdGhpcyBjb2RlLlxuXG4gICBUaGUgY29kZXMgYXJlIHNvcnRlZCBieSBjb21wdXRpbmcgYSBjb3VudCBvZiBjb2RlcyBmb3IgZWFjaCBsZW5ndGgsXG4gICBjcmVhdGluZyBmcm9tIHRoYXQgYSB0YWJsZSBvZiBzdGFydGluZyBpbmRpY2VzIGZvciBlYWNoIGxlbmd0aCBpbiB0aGVcbiAgIHNvcnRlZCB0YWJsZSwgYW5kIHRoZW4gZW50ZXJpbmcgdGhlIHN5bWJvbHMgaW4gb3JkZXIgaW4gdGhlIHNvcnRlZFxuICAgdGFibGUuICBUaGUgc29ydGVkIHRhYmxlIGlzIHdvcmtbXSwgd2l0aCB0aGF0IHNwYWNlIGJlaW5nIHByb3ZpZGVkIGJ5XG4gICB0aGUgY2FsbGVyLlxuXG4gICBUaGUgbGVuZ3RoIGNvdW50cyBhcmUgdXNlZCBmb3Igb3RoZXIgcHVycG9zZXMgYXMgd2VsbCwgaS5lLiBmaW5kaW5nXG4gICB0aGUgbWluaW11bSBhbmQgbWF4aW11bSBsZW5ndGggY29kZXMsIGRldGVybWluaW5nIGlmIHRoZXJlIGFyZSBhbnlcbiAgIGNvZGVzIGF0IGFsbCwgY2hlY2tpbmcgZm9yIGEgdmFsaWQgc2V0IG9mIGxlbmd0aHMsIGFuZCBsb29raW5nIGFoZWFkXG4gICBhdCBsZW5ndGggY291bnRzIHRvIGRldGVybWluZSBzdWItdGFibGUgc2l6ZXMgd2hlbiBidWlsZGluZyB0aGVcbiAgIGRlY29kaW5nIHRhYmxlcy5cbiAgICovXG5cbiAgLyogYWNjdW11bGF0ZSBsZW5ndGhzIGZvciBjb2RlcyAoYXNzdW1lcyBsZW5zW10gYWxsIGluIDAuLk1BWEJJVFMpICovXG4gIGZvciAobGVuID0gMDsgbGVuIDw9IE1BWEJJVFM7IGxlbisrKSB7XG4gICAgY291bnRbbGVuXSA9IDA7XG4gIH1cbiAgZm9yIChzeW0gPSAwOyBzeW0gPCBjb2Rlczsgc3ltKyspIHtcbiAgICBjb3VudFtsZW5zW2xlbnNfaW5kZXggKyBzeW1dXSsrO1xuICB9XG5cbiAgLyogYm91bmQgY29kZSBsZW5ndGhzLCBmb3JjZSByb290IHRvIGJlIHdpdGhpbiBjb2RlIGxlbmd0aHMgKi9cbiAgcm9vdCA9IGJpdHM7XG4gIGZvciAobWF4ID0gTUFYQklUUzsgbWF4ID49IDE7IG1heC0tKSB7XG4gICAgaWYgKGNvdW50W21heF0gIT09IDApIHsgYnJlYWs7IH1cbiAgfVxuICBpZiAocm9vdCA+IG1heCkge1xuICAgIHJvb3QgPSBtYXg7XG4gIH1cbiAgaWYgKG1heCA9PT0gMCkgeyAgICAgICAgICAgICAgICAgICAgIC8qIG5vIHN5bWJvbHMgdG8gY29kZSBhdCBhbGwgKi9cbiAgICAvL3RhYmxlLm9wW29wdHMudGFibGVfaW5kZXhdID0gNjQ7ICAvL2hlcmUub3AgPSAodmFyIGNoYXIpNjQ7ICAgIC8qIGludmFsaWQgY29kZSBtYXJrZXIgKi9cbiAgICAvL3RhYmxlLmJpdHNbb3B0cy50YWJsZV9pbmRleF0gPSAxOyAgIC8vaGVyZS5iaXRzID0gKHZhciBjaGFyKTE7XG4gICAgLy90YWJsZS52YWxbb3B0cy50YWJsZV9pbmRleCsrXSA9IDA7ICAgLy9oZXJlLnZhbCA9ICh2YXIgc2hvcnQpMDtcbiAgICB0YWJsZVt0YWJsZV9pbmRleCsrXSA9ICgxIDw8IDI0KSB8ICg2NCA8PCAxNikgfCAwO1xuXG5cbiAgICAvL3RhYmxlLm9wW29wdHMudGFibGVfaW5kZXhdID0gNjQ7XG4gICAgLy90YWJsZS5iaXRzW29wdHMudGFibGVfaW5kZXhdID0gMTtcbiAgICAvL3RhYmxlLnZhbFtvcHRzLnRhYmxlX2luZGV4KytdID0gMDtcbiAgICB0YWJsZVt0YWJsZV9pbmRleCsrXSA9ICgxIDw8IDI0KSB8ICg2NCA8PCAxNikgfCAwO1xuXG4gICAgb3B0cy5iaXRzID0gMTtcbiAgICByZXR1cm4gMDsgICAgIC8qIG5vIHN5bWJvbHMsIGJ1dCB3YWl0IGZvciBkZWNvZGluZyB0byByZXBvcnQgZXJyb3IgKi9cbiAgfVxuICBmb3IgKG1pbiA9IDE7IG1pbiA8IG1heDsgbWluKyspIHtcbiAgICBpZiAoY291bnRbbWluXSAhPT0gMCkgeyBicmVhazsgfVxuICB9XG4gIGlmIChyb290IDwgbWluKSB7XG4gICAgcm9vdCA9IG1pbjtcbiAgfVxuXG4gIC8qIGNoZWNrIGZvciBhbiBvdmVyLXN1YnNjcmliZWQgb3IgaW5jb21wbGV0ZSBzZXQgb2YgbGVuZ3RocyAqL1xuICBsZWZ0ID0gMTtcbiAgZm9yIChsZW4gPSAxOyBsZW4gPD0gTUFYQklUUzsgbGVuKyspIHtcbiAgICBsZWZ0IDw8PSAxO1xuICAgIGxlZnQgLT0gY291bnRbbGVuXTtcbiAgICBpZiAobGVmdCA8IDApIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9ICAgICAgICAvKiBvdmVyLXN1YnNjcmliZWQgKi9cbiAgfVxuICBpZiAobGVmdCA+IDAgJiYgKHR5cGUgPT09IENPREVTIHx8IG1heCAhPT0gMSkpIHtcbiAgICByZXR1cm4gLTE7ICAgICAgICAgICAgICAgICAgICAgIC8qIGluY29tcGxldGUgc2V0ICovXG4gIH1cblxuICAvKiBnZW5lcmF0ZSBvZmZzZXRzIGludG8gc3ltYm9sIHRhYmxlIGZvciBlYWNoIGxlbmd0aCBmb3Igc29ydGluZyAqL1xuICBvZmZzWzFdID0gMDtcbiAgZm9yIChsZW4gPSAxOyBsZW4gPCBNQVhCSVRTOyBsZW4rKykge1xuICAgIG9mZnNbbGVuICsgMV0gPSBvZmZzW2xlbl0gKyBjb3VudFtsZW5dO1xuICB9XG5cbiAgLyogc29ydCBzeW1ib2xzIGJ5IGxlbmd0aCwgYnkgc3ltYm9sIG9yZGVyIHdpdGhpbiBlYWNoIGxlbmd0aCAqL1xuICBmb3IgKHN5bSA9IDA7IHN5bSA8IGNvZGVzOyBzeW0rKykge1xuICAgIGlmIChsZW5zW2xlbnNfaW5kZXggKyBzeW1dICE9PSAwKSB7XG4gICAgICB3b3JrW29mZnNbbGVuc1tsZW5zX2luZGV4ICsgc3ltXV0rK10gPSBzeW07XG4gICAgfVxuICB9XG5cbiAgLypcbiAgIENyZWF0ZSBhbmQgZmlsbCBpbiBkZWNvZGluZyB0YWJsZXMuICBJbiB0aGlzIGxvb3AsIHRoZSB0YWJsZSBiZWluZ1xuICAgZmlsbGVkIGlzIGF0IG5leHQgYW5kIGhhcyBjdXJyIGluZGV4IGJpdHMuICBUaGUgY29kZSBiZWluZyB1c2VkIGlzIGh1ZmZcbiAgIHdpdGggbGVuZ3RoIGxlbi4gIFRoYXQgY29kZSBpcyBjb252ZXJ0ZWQgdG8gYW4gaW5kZXggYnkgZHJvcHBpbmcgZHJvcFxuICAgYml0cyBvZmYgb2YgdGhlIGJvdHRvbS4gIEZvciBjb2RlcyB3aGVyZSBsZW4gaXMgbGVzcyB0aGFuIGRyb3AgKyBjdXJyLFxuICAgdGhvc2UgdG9wIGRyb3AgKyBjdXJyIC0gbGVuIGJpdHMgYXJlIGluY3JlbWVudGVkIHRocm91Z2ggYWxsIHZhbHVlcyB0b1xuICAgZmlsbCB0aGUgdGFibGUgd2l0aCByZXBsaWNhdGVkIGVudHJpZXMuXG5cbiAgIHJvb3QgaXMgdGhlIG51bWJlciBvZiBpbmRleCBiaXRzIGZvciB0aGUgcm9vdCB0YWJsZS4gIFdoZW4gbGVuIGV4Y2VlZHNcbiAgIHJvb3QsIHN1Yi10YWJsZXMgYXJlIGNyZWF0ZWQgcG9pbnRlZCB0byBieSB0aGUgcm9vdCBlbnRyeSB3aXRoIGFuIGluZGV4XG4gICBvZiB0aGUgbG93IHJvb3QgYml0cyBvZiBodWZmLiAgVGhpcyBpcyBzYXZlZCBpbiBsb3cgdG8gY2hlY2sgZm9yIHdoZW4gYVxuICAgbmV3IHN1Yi10YWJsZSBzaG91bGQgYmUgc3RhcnRlZC4gIGRyb3AgaXMgemVybyB3aGVuIHRoZSByb290IHRhYmxlIGlzXG4gICBiZWluZyBmaWxsZWQsIGFuZCBkcm9wIGlzIHJvb3Qgd2hlbiBzdWItdGFibGVzIGFyZSBiZWluZyBmaWxsZWQuXG5cbiAgIFdoZW4gYSBuZXcgc3ViLXRhYmxlIGlzIG5lZWRlZCwgaXQgaXMgbmVjZXNzYXJ5IHRvIGxvb2sgYWhlYWQgaW4gdGhlXG4gICBjb2RlIGxlbmd0aHMgdG8gZGV0ZXJtaW5lIHdoYXQgc2l6ZSBzdWItdGFibGUgaXMgbmVlZGVkLiAgVGhlIGxlbmd0aFxuICAgY291bnRzIGFyZSB1c2VkIGZvciB0aGlzLCBhbmQgc28gY291bnRbXSBpcyBkZWNyZW1lbnRlZCBhcyBjb2RlcyBhcmVcbiAgIGVudGVyZWQgaW4gdGhlIHRhYmxlcy5cblxuICAgdXNlZCBrZWVwcyB0cmFjayBvZiBob3cgbWFueSB0YWJsZSBlbnRyaWVzIGhhdmUgYmVlbiBhbGxvY2F0ZWQgZnJvbSB0aGVcbiAgIHByb3ZpZGVkICp0YWJsZSBzcGFjZS4gIEl0IGlzIGNoZWNrZWQgZm9yIExFTlMgYW5kIERJU1QgdGFibGVzIGFnYWluc3RcbiAgIHRoZSBjb25zdGFudHMgRU5PVUdIX0xFTlMgYW5kIEVOT1VHSF9ESVNUUyB0byBndWFyZCBhZ2FpbnN0IGNoYW5nZXMgaW5cbiAgIHRoZSBpbml0aWFsIHJvb3QgdGFibGUgc2l6ZSBjb25zdGFudHMuICBTZWUgdGhlIGNvbW1lbnRzIGluIGluZnRyZWVzLmhcbiAgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICBzeW0gaW5jcmVtZW50cyB0aHJvdWdoIGFsbCBzeW1ib2xzLCBhbmQgdGhlIGxvb3AgdGVybWluYXRlcyB3aGVuXG4gICBhbGwgY29kZXMgb2YgbGVuZ3RoIG1heCwgaS5lLiBhbGwgY29kZXMsIGhhdmUgYmVlbiBwcm9jZXNzZWQuICBUaGlzXG4gICByb3V0aW5lIHBlcm1pdHMgaW5jb21wbGV0ZSBjb2Rlcywgc28gYW5vdGhlciBsb29wIGFmdGVyIHRoaXMgb25lIGZpbGxzXG4gICBpbiB0aGUgcmVzdCBvZiB0aGUgZGVjb2RpbmcgdGFibGVzIHdpdGggaW52YWxpZCBjb2RlIG1hcmtlcnMuXG4gICAqL1xuXG4gIC8qIHNldCB1cCBmb3IgY29kZSB0eXBlICovXG4gIC8vIHBvb3IgbWFuIG9wdGltaXphdGlvbiAtIHVzZSBpZi1lbHNlIGluc3RlYWQgb2Ygc3dpdGNoLFxuICAvLyB0byBhdm9pZCBkZW9wdHMgaW4gb2xkIHY4XG4gIGlmICh0eXBlID09PSBDT0RFUykge1xuICAgIGJhc2UgPSBleHRyYSA9IHdvcms7ICAgIC8qIGR1bW15IHZhbHVlLS1ub3QgdXNlZCAqL1xuICAgIGVuZCA9IDE5O1xuXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gTEVOUykge1xuICAgIGJhc2UgPSBsYmFzZTtcbiAgICBiYXNlX2luZGV4IC09IDI1NztcbiAgICBleHRyYSA9IGxleHQ7XG4gICAgZXh0cmFfaW5kZXggLT0gMjU3O1xuICAgIGVuZCA9IDI1NjtcblxuICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgLyogRElTVFMgKi9cbiAgICBiYXNlID0gZGJhc2U7XG4gICAgZXh0cmEgPSBkZXh0O1xuICAgIGVuZCA9IC0xO1xuICB9XG5cbiAgLyogaW5pdGlhbGl6ZSBvcHRzIGZvciBsb29wICovXG4gIGh1ZmYgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBzdGFydGluZyBjb2RlICovXG4gIHN5bSA9IDA7ICAgICAgICAgICAgICAgICAgICAvKiBzdGFydGluZyBjb2RlIHN5bWJvbCAqL1xuICBsZW4gPSBtaW47ICAgICAgICAgICAgICAgICAgLyogc3RhcnRpbmcgY29kZSBsZW5ndGggKi9cbiAgbmV4dCA9IHRhYmxlX2luZGV4OyAgICAgICAgICAgICAgLyogY3VycmVudCB0YWJsZSB0byBmaWxsIGluICovXG4gIGN1cnIgPSByb290OyAgICAgICAgICAgICAgICAvKiBjdXJyZW50IHRhYmxlIGluZGV4IGJpdHMgKi9cbiAgZHJvcCA9IDA7ICAgICAgICAgICAgICAgICAgIC8qIGN1cnJlbnQgYml0cyB0byBkcm9wIGZyb20gY29kZSBmb3IgaW5kZXggKi9cbiAgbG93ID0gLTE7ICAgICAgICAgICAgICAgICAgIC8qIHRyaWdnZXIgbmV3IHN1Yi10YWJsZSB3aGVuIGxlbiA+IHJvb3QgKi9cbiAgdXNlZCA9IDEgPDwgcm9vdDsgICAgICAgICAgLyogdXNlIHJvb3QgdGFibGUgZW50cmllcyAqL1xuICBtYXNrID0gdXNlZCAtIDE7ICAgICAgICAgICAgLyogbWFzayBmb3IgY29tcGFyaW5nIGxvdyAqL1xuXG4gIC8qIGNoZWNrIGF2YWlsYWJsZSB0YWJsZSBzcGFjZSAqL1xuICBpZiAoKHR5cGUgPT09IExFTlMgJiYgdXNlZCA+IEVOT1VHSF9MRU5TKSB8fFxuICAgICh0eXBlID09PSBESVNUUyAmJiB1c2VkID4gRU5PVUdIX0RJU1RTKSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgLyogcHJvY2VzcyBhbGwgY29kZXMgYW5kIG1ha2UgdGFibGUgZW50cmllcyAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogY3JlYXRlIHRhYmxlIGVudHJ5ICovXG4gICAgaGVyZV9iaXRzID0gbGVuIC0gZHJvcDtcbiAgICBpZiAod29ya1tzeW1dIDwgZW5kKSB7XG4gICAgICBoZXJlX29wID0gMDtcbiAgICAgIGhlcmVfdmFsID0gd29ya1tzeW1dO1xuICAgIH1cbiAgICBlbHNlIGlmICh3b3JrW3N5bV0gPiBlbmQpIHtcbiAgICAgIGhlcmVfb3AgPSBleHRyYVtleHRyYV9pbmRleCArIHdvcmtbc3ltXV07XG4gICAgICBoZXJlX3ZhbCA9IGJhc2VbYmFzZV9pbmRleCArIHdvcmtbc3ltXV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGVyZV9vcCA9IDMyICsgNjQ7ICAgICAgICAgLyogZW5kIG9mIGJsb2NrICovXG4gICAgICBoZXJlX3ZhbCA9IDA7XG4gICAgfVxuXG4gICAgLyogcmVwbGljYXRlIGZvciB0aG9zZSBpbmRpY2VzIHdpdGggbG93IGxlbiBiaXRzIGVxdWFsIHRvIGh1ZmYgKi9cbiAgICBpbmNyID0gMSA8PCAobGVuIC0gZHJvcCk7XG4gICAgZmlsbCA9IDEgPDwgY3VycjtcbiAgICBtaW4gPSBmaWxsOyAgICAgICAgICAgICAgICAgLyogc2F2ZSBvZmZzZXQgdG8gbmV4dCB0YWJsZSAqL1xuICAgIGRvIHtcbiAgICAgIGZpbGwgLT0gaW5jcjtcbiAgICAgIHRhYmxlW25leHQgKyAoaHVmZiA+PiBkcm9wKSArIGZpbGxdID0gKGhlcmVfYml0cyA8PCAyNCkgfCAoaGVyZV9vcCA8PCAxNikgfCBoZXJlX3ZhbCB8MDtcbiAgICB9IHdoaWxlIChmaWxsICE9PSAwKTtcblxuICAgIC8qIGJhY2t3YXJkcyBpbmNyZW1lbnQgdGhlIGxlbi1iaXQgY29kZSBodWZmICovXG4gICAgaW5jciA9IDEgPDwgKGxlbiAtIDEpO1xuICAgIHdoaWxlIChodWZmICYgaW5jcikge1xuICAgICAgaW5jciA+Pj0gMTtcbiAgICB9XG4gICAgaWYgKGluY3IgIT09IDApIHtcbiAgICAgIGh1ZmYgJj0gaW5jciAtIDE7XG4gICAgICBodWZmICs9IGluY3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGh1ZmYgPSAwO1xuICAgIH1cblxuICAgIC8qIGdvIHRvIG5leHQgc3ltYm9sLCB1cGRhdGUgY291bnQsIGxlbiAqL1xuICAgIHN5bSsrO1xuICAgIGlmICgtLWNvdW50W2xlbl0gPT09IDApIHtcbiAgICAgIGlmIChsZW4gPT09IG1heCkgeyBicmVhazsgfVxuICAgICAgbGVuID0gbGVuc1tsZW5zX2luZGV4ICsgd29ya1tzeW1dXTtcbiAgICB9XG5cbiAgICAvKiBjcmVhdGUgbmV3IHN1Yi10YWJsZSBpZiBuZWVkZWQgKi9cbiAgICBpZiAobGVuID4gcm9vdCAmJiAoaHVmZiAmIG1hc2spICE9PSBsb3cpIHtcbiAgICAgIC8qIGlmIGZpcnN0IHRpbWUsIHRyYW5zaXRpb24gdG8gc3ViLXRhYmxlcyAqL1xuICAgICAgaWYgKGRyb3AgPT09IDApIHtcbiAgICAgICAgZHJvcCA9IHJvb3Q7XG4gICAgICB9XG5cbiAgICAgIC8qIGluY3JlbWVudCBwYXN0IGxhc3QgdGFibGUgKi9cbiAgICAgIG5leHQgKz0gbWluOyAgICAgICAgICAgIC8qIGhlcmUgbWluIGlzIDEgPDwgY3VyciAqL1xuXG4gICAgICAvKiBkZXRlcm1pbmUgbGVuZ3RoIG9mIG5leHQgdGFibGUgKi9cbiAgICAgIGN1cnIgPSBsZW4gLSBkcm9wO1xuICAgICAgbGVmdCA9IDEgPDwgY3VycjtcbiAgICAgIHdoaWxlIChjdXJyICsgZHJvcCA8IG1heCkge1xuICAgICAgICBsZWZ0IC09IGNvdW50W2N1cnIgKyBkcm9wXTtcbiAgICAgICAgaWYgKGxlZnQgPD0gMCkgeyBicmVhazsgfVxuICAgICAgICBjdXJyKys7XG4gICAgICAgIGxlZnQgPDw9IDE7XG4gICAgICB9XG5cbiAgICAgIC8qIGNoZWNrIGZvciBlbm91Z2ggc3BhY2UgKi9cbiAgICAgIHVzZWQgKz0gMSA8PCBjdXJyO1xuICAgICAgaWYgKCh0eXBlID09PSBMRU5TICYmIHVzZWQgPiBFTk9VR0hfTEVOUykgfHxcbiAgICAgICAgKHR5cGUgPT09IERJU1RTICYmIHVzZWQgPiBFTk9VR0hfRElTVFMpKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICAvKiBwb2ludCBlbnRyeSBpbiByb290IHRhYmxlIHRvIHN1Yi10YWJsZSAqL1xuICAgICAgbG93ID0gaHVmZiAmIG1hc2s7XG4gICAgICAvKnRhYmxlLm9wW2xvd10gPSBjdXJyO1xuICAgICAgdGFibGUuYml0c1tsb3ddID0gcm9vdDtcbiAgICAgIHRhYmxlLnZhbFtsb3ddID0gbmV4dCAtIG9wdHMudGFibGVfaW5kZXg7Ki9cbiAgICAgIHRhYmxlW2xvd10gPSAocm9vdCA8PCAyNCkgfCAoY3VyciA8PCAxNikgfCAobmV4dCAtIHRhYmxlX2luZGV4KSB8MDtcbiAgICB9XG4gIH1cblxuICAvKiBmaWxsIGluIHJlbWFpbmluZyB0YWJsZSBlbnRyeSBpZiBjb2RlIGlzIGluY29tcGxldGUgKGd1YXJhbnRlZWQgdG8gaGF2ZVxuICAgYXQgbW9zdCBvbmUgcmVtYWluaW5nIGVudHJ5LCBzaW5jZSBpZiB0aGUgY29kZSBpcyBpbmNvbXBsZXRlLCB0aGVcbiAgIG1heGltdW0gY29kZSBsZW5ndGggdGhhdCB3YXMgYWxsb3dlZCB0byBnZXQgdGhpcyBmYXIgaXMgb25lIGJpdCkgKi9cbiAgaWYgKGh1ZmYgIT09IDApIHtcbiAgICAvL3RhYmxlLm9wW25leHQgKyBodWZmXSA9IDY0OyAgICAgICAgICAgIC8qIGludmFsaWQgY29kZSBtYXJrZXIgKi9cbiAgICAvL3RhYmxlLmJpdHNbbmV4dCArIGh1ZmZdID0gbGVuIC0gZHJvcDtcbiAgICAvL3RhYmxlLnZhbFtuZXh0ICsgaHVmZl0gPSAwO1xuICAgIHRhYmxlW25leHQgKyBodWZmXSA9ICgobGVuIC0gZHJvcCkgPDwgMjQpIHwgKDY0IDw8IDE2KSB8MDtcbiAgfVxuXG4gIC8qIHNldCByZXR1cm4gcGFyYW1ldGVycyAqL1xuICAvL29wdHMudGFibGVfaW5kZXggKz0gdXNlZDtcbiAgb3B0cy5iaXRzID0gcm9vdDtcbiAgcmV0dXJuIDA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAoQykgMTk5NS0yMDEzIEplYW4tbG91cCBHYWlsbHkgYW5kIE1hcmsgQWRsZXJcbi8vIChDKSAyMDE0LTIwMTcgVml0YWx5IFB1enJpbiBhbmQgQW5kcmV5IFR1cGl0c2luXG4vL1xuLy8gVGhpcyBzb2Z0d2FyZSBpcyBwcm92aWRlZCAnYXMtaXMnLCB3aXRob3V0IGFueSBleHByZXNzIG9yIGltcGxpZWRcbi8vIHdhcnJhbnR5LiBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlc1xuLy8gYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSxcbi8vIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucywgYW5kIHRvIGFsdGVyIGl0IGFuZCByZWRpc3RyaWJ1dGUgaXRcbi8vIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczpcbi8vXG4vLyAxLiBUaGUgb3JpZ2luIG9mIHRoaXMgc29mdHdhcmUgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdFxuLy8gICBjbGFpbSB0aGF0IHlvdSB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpcyBzb2Z0d2FyZVxuLy8gICBpbiBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmVcbi8vICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC5cbi8vIDIuIEFsdGVyZWQgc291cmNlIHZlcnNpb25zIG11c3QgYmUgcGxhaW5seSBtYXJrZWQgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlXG4vLyAgIG1pc3JlcHJlc2VudGVkIGFzIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbi8vIDMuIFRoaXMgbm90aWNlIG1heSBub3QgYmUgcmVtb3ZlZCBvciBhbHRlcmVkIGZyb20gYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAyOiAgICAgICduZWVkIGRpY3Rpb25hcnknLCAgICAgLyogWl9ORUVEX0RJQ1QgICAgICAgMiAgKi9cbiAgMTogICAgICAnc3RyZWFtIGVuZCcsICAgICAgICAgIC8qIFpfU1RSRUFNX0VORCAgICAgIDEgICovXG4gIDA6ICAgICAgJycsICAgICAgICAgICAgICAgICAgICAvKiBaX09LICAgICAgICAgICAgICAwICAqL1xuICAnLTEnOiAgICdmaWxlIGVycm9yJywgICAgICAgICAgLyogWl9FUlJOTyAgICAgICAgICgtMSkgKi9cbiAgJy0yJzogICAnc3RyZWFtIGVycm9yJywgICAgICAgIC8qIFpfU1RSRUFNX0VSUk9SICAoLTIpICovXG4gICctMyc6ICAgJ2RhdGEgZXJyb3InLCAgICAgICAgICAvKiBaX0RBVEFfRVJST1IgICAgKC0zKSAqL1xuICAnLTQnOiAgICdpbnN1ZmZpY2llbnQgbWVtb3J5JywgLyogWl9NRU1fRVJST1IgICAgICgtNCkgKi9cbiAgJy01JzogICAnYnVmZmVyIGVycm9yJywgICAgICAgIC8qIFpfQlVGX0VSUk9SICAgICAoLTUpICovXG4gICctNic6ICAgJ2luY29tcGF0aWJsZSB2ZXJzaW9uJyAvKiBaX1ZFUlNJT05fRVJST1IgKC02KSAqL1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcblxuLyogUHVibGljIGNvbnN0YW50cyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuLy92YXIgWl9GSUxURVJFRCAgICAgICAgICA9IDE7XG4vL3ZhciBaX0hVRkZNQU5fT05MWSAgICAgID0gMjtcbi8vdmFyIFpfUkxFICAgICAgICAgICAgICAgPSAzO1xudmFyIFpfRklYRUQgICAgICAgICAgICAgICA9IDQ7XG4vL3ZhciBaX0RFRkFVTFRfU1RSQVRFR1kgID0gMDtcblxuLyogUG9zc2libGUgdmFsdWVzIG9mIHRoZSBkYXRhX3R5cGUgZmllbGQgKHRob3VnaCBzZWUgaW5mbGF0ZSgpKSAqL1xudmFyIFpfQklOQVJZICAgICAgICAgICAgICA9IDA7XG52YXIgWl9URVhUICAgICAgICAgICAgICAgID0gMTtcbi8vdmFyIFpfQVNDSUkgICAgICAgICAgICAgPSAxOyAvLyA9IFpfVEVYVFxudmFyIFpfVU5LTk9XTiAgICAgICAgICAgICA9IDI7XG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuZnVuY3Rpb24gemVybyhidWYpIHsgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7IHdoaWxlICgtLWxlbiA+PSAwKSB7IGJ1ZltsZW5dID0gMDsgfSB9XG5cbi8vIEZyb20genV0aWwuaFxuXG52YXIgU1RPUkVEX0JMT0NLID0gMDtcbnZhciBTVEFUSUNfVFJFRVMgPSAxO1xudmFyIERZTl9UUkVFUyAgICA9IDI7XG4vKiBUaGUgdGhyZWUga2luZHMgb2YgYmxvY2sgdHlwZSAqL1xuXG52YXIgTUlOX01BVENIICAgID0gMztcbnZhciBNQVhfTUFUQ0ggICAgPSAyNTg7XG4vKiBUaGUgbWluaW11bSBhbmQgbWF4aW11bSBtYXRjaCBsZW5ndGhzICovXG5cbi8vIEZyb20gZGVmbGF0ZS5oXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEludGVybmFsIGNvbXByZXNzaW9uIHN0YXRlLlxuICovXG5cbnZhciBMRU5HVEhfQ09ERVMgID0gMjk7XG4vKiBudW1iZXIgb2YgbGVuZ3RoIGNvZGVzLCBub3QgY291bnRpbmcgdGhlIHNwZWNpYWwgRU5EX0JMT0NLIGNvZGUgKi9cblxudmFyIExJVEVSQUxTICAgICAgPSAyNTY7XG4vKiBudW1iZXIgb2YgbGl0ZXJhbCBieXRlcyAwLi4yNTUgKi9cblxudmFyIExfQ09ERVMgICAgICAgPSBMSVRFUkFMUyArIDEgKyBMRU5HVEhfQ09ERVM7XG4vKiBudW1iZXIgb2YgTGl0ZXJhbCBvciBMZW5ndGggY29kZXMsIGluY2x1ZGluZyB0aGUgRU5EX0JMT0NLIGNvZGUgKi9cblxudmFyIERfQ09ERVMgICAgICAgPSAzMDtcbi8qIG51bWJlciBvZiBkaXN0YW5jZSBjb2RlcyAqL1xuXG52YXIgQkxfQ09ERVMgICAgICA9IDE5O1xuLyogbnVtYmVyIG9mIGNvZGVzIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGJpdCBsZW5ndGhzICovXG5cbnZhciBIRUFQX1NJWkUgICAgID0gMiAqIExfQ09ERVMgKyAxO1xuLyogbWF4aW11bSBoZWFwIHNpemUgKi9cblxudmFyIE1BWF9CSVRTICAgICAgPSAxNTtcbi8qIEFsbCBjb2RlcyBtdXN0IG5vdCBleGNlZWQgTUFYX0JJVFMgYml0cyAqL1xuXG52YXIgQnVmX3NpemUgICAgICA9IDE2O1xuLyogc2l6ZSBvZiBiaXQgYnVmZmVyIGluIGJpX2J1ZiAqL1xuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29uc3RhbnRzXG4gKi9cblxudmFyIE1BWF9CTF9CSVRTID0gNztcbi8qIEJpdCBsZW5ndGggY29kZXMgbXVzdCBub3QgZXhjZWVkIE1BWF9CTF9CSVRTIGJpdHMgKi9cblxudmFyIEVORF9CTE9DSyAgID0gMjU2O1xuLyogZW5kIG9mIGJsb2NrIGxpdGVyYWwgY29kZSAqL1xuXG52YXIgUkVQXzNfNiAgICAgPSAxNjtcbi8qIHJlcGVhdCBwcmV2aW91cyBiaXQgbGVuZ3RoIDMtNiB0aW1lcyAoMiBiaXRzIG9mIHJlcGVhdCBjb3VudCkgKi9cblxudmFyIFJFUFpfM18xMCAgID0gMTc7XG4vKiByZXBlYXQgYSB6ZXJvIGxlbmd0aCAzLTEwIHRpbWVzICAoMyBiaXRzIG9mIHJlcGVhdCBjb3VudCkgKi9cblxudmFyIFJFUFpfMTFfMTM4ID0gMTg7XG4vKiByZXBlYXQgYSB6ZXJvIGxlbmd0aCAxMS0xMzggdGltZXMgICg3IGJpdHMgb2YgcmVwZWF0IGNvdW50KSAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21tYS1zcGFjaW5nLGFycmF5LWJyYWNrZXQtc3BhY2luZyAqL1xudmFyIGV4dHJhX2xiaXRzID0gICAvKiBleHRyYSBiaXRzIGZvciBlYWNoIGxlbmd0aCBjb2RlICovXG4gIFswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDBdO1xuXG52YXIgZXh0cmFfZGJpdHMgPSAgIC8qIGV4dHJhIGJpdHMgZm9yIGVhY2ggZGlzdGFuY2UgY29kZSAqL1xuICBbMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM107XG5cbnZhciBleHRyYV9ibGJpdHMgPSAgLyogZXh0cmEgYml0cyBmb3IgZWFjaCBiaXQgbGVuZ3RoIGNvZGUgKi9cbiAgWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwzLDddO1xuXG52YXIgYmxfb3JkZXIgPVxuICBbMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV07XG4vKiBlc2xpbnQtZW5hYmxlIGNvbW1hLXNwYWNpbmcsYXJyYXktYnJhY2tldC1zcGFjaW5nICovXG5cbi8qIFRoZSBsZW5ndGhzIG9mIHRoZSBiaXQgbGVuZ3RoIGNvZGVzIGFyZSBzZW50IGluIG9yZGVyIG9mIGRlY3JlYXNpbmdcbiAqIHByb2JhYmlsaXR5LCB0byBhdm9pZCB0cmFuc21pdHRpbmcgdGhlIGxlbmd0aHMgZm9yIHVudXNlZCBiaXQgbGVuZ3RoIGNvZGVzLlxuICovXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTG9jYWwgZGF0YS4gVGhlc2UgYXJlIGluaXRpYWxpemVkIG9ubHkgb25jZS5cbiAqL1xuXG4vLyBXZSBwcmUtZmlsbCBhcnJheXMgd2l0aCAwIHRvIGF2b2lkIHVuaW5pdGlhbGl6ZWQgZ2Fwc1xuXG52YXIgRElTVF9DT0RFX0xFTiA9IDUxMjsgLyogc2VlIGRlZmluaXRpb24gb2YgYXJyYXkgZGlzdF9jb2RlIGJlbG93ICovXG5cbi8vICEhISEgVXNlIGZsYXQgYXJyYXkgaW5zdGVhZCBvZiBzdHJ1Y3R1cmUsIEZyZXEgPSBpKjIsIExlbiA9IGkqMisxXG52YXIgc3RhdGljX2x0cmVlICA9IG5ldyBBcnJheSgoTF9DT0RFUyArIDIpICogMik7XG56ZXJvKHN0YXRpY19sdHJlZSk7XG4vKiBUaGUgc3RhdGljIGxpdGVyYWwgdHJlZS4gU2luY2UgdGhlIGJpdCBsZW5ndGhzIGFyZSBpbXBvc2VkLCB0aGVyZSBpcyBub1xuICogbmVlZCBmb3IgdGhlIExfQ09ERVMgZXh0cmEgY29kZXMgdXNlZCBkdXJpbmcgaGVhcCBjb25zdHJ1Y3Rpb24uIEhvd2V2ZXJcbiAqIFRoZSBjb2RlcyAyODYgYW5kIDI4NyBhcmUgbmVlZGVkIHRvIGJ1aWxkIGEgY2Fub25pY2FsIHRyZWUgKHNlZSBfdHJfaW5pdFxuICogYmVsb3cpLlxuICovXG5cbnZhciBzdGF0aWNfZHRyZWUgID0gbmV3IEFycmF5KERfQ09ERVMgKiAyKTtcbnplcm8oc3RhdGljX2R0cmVlKTtcbi8qIFRoZSBzdGF0aWMgZGlzdGFuY2UgdHJlZS4gKEFjdHVhbGx5IGEgdHJpdmlhbCB0cmVlIHNpbmNlIGFsbCBjb2RlcyB1c2VcbiAqIDUgYml0cy4pXG4gKi9cblxudmFyIF9kaXN0X2NvZGUgICAgPSBuZXcgQXJyYXkoRElTVF9DT0RFX0xFTik7XG56ZXJvKF9kaXN0X2NvZGUpO1xuLyogRGlzdGFuY2UgY29kZXMuIFRoZSBmaXJzdCAyNTYgdmFsdWVzIGNvcnJlc3BvbmQgdG8gdGhlIGRpc3RhbmNlc1xuICogMyAuLiAyNTgsIHRoZSBsYXN0IDI1NiB2YWx1ZXMgY29ycmVzcG9uZCB0byB0aGUgdG9wIDggYml0cyBvZlxuICogdGhlIDE1IGJpdCBkaXN0YW5jZXMuXG4gKi9cblxudmFyIF9sZW5ndGhfY29kZSAgPSBuZXcgQXJyYXkoTUFYX01BVENIIC0gTUlOX01BVENIICsgMSk7XG56ZXJvKF9sZW5ndGhfY29kZSk7XG4vKiBsZW5ndGggY29kZSBmb3IgZWFjaCBub3JtYWxpemVkIG1hdGNoIGxlbmd0aCAoMCA9PSBNSU5fTUFUQ0gpICovXG5cbnZhciBiYXNlX2xlbmd0aCAgID0gbmV3IEFycmF5KExFTkdUSF9DT0RFUyk7XG56ZXJvKGJhc2VfbGVuZ3RoKTtcbi8qIEZpcnN0IG5vcm1hbGl6ZWQgbGVuZ3RoIGZvciBlYWNoIGNvZGUgKDAgPSBNSU5fTUFUQ0gpICovXG5cbnZhciBiYXNlX2Rpc3QgICAgID0gbmV3IEFycmF5KERfQ09ERVMpO1xuemVybyhiYXNlX2Rpc3QpO1xuLyogRmlyc3Qgbm9ybWFsaXplZCBkaXN0YW5jZSBmb3IgZWFjaCBjb2RlICgwID0gZGlzdGFuY2Ugb2YgMSkgKi9cblxuXG5mdW5jdGlvbiBTdGF0aWNUcmVlRGVzYyhzdGF0aWNfdHJlZSwgZXh0cmFfYml0cywgZXh0cmFfYmFzZSwgZWxlbXMsIG1heF9sZW5ndGgpIHtcblxuICB0aGlzLnN0YXRpY190cmVlICA9IHN0YXRpY190cmVlOyAgLyogc3RhdGljIHRyZWUgb3IgTlVMTCAqL1xuICB0aGlzLmV4dHJhX2JpdHMgICA9IGV4dHJhX2JpdHM7ICAgLyogZXh0cmEgYml0cyBmb3IgZWFjaCBjb2RlIG9yIE5VTEwgKi9cbiAgdGhpcy5leHRyYV9iYXNlICAgPSBleHRyYV9iYXNlOyAgIC8qIGJhc2UgaW5kZXggZm9yIGV4dHJhX2JpdHMgKi9cbiAgdGhpcy5lbGVtcyAgICAgICAgPSBlbGVtczsgICAgICAgIC8qIG1heCBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHRyZWUgKi9cbiAgdGhpcy5tYXhfbGVuZ3RoICAgPSBtYXhfbGVuZ3RoOyAgIC8qIG1heCBiaXQgbGVuZ3RoIGZvciB0aGUgY29kZXMgKi9cblxuICAvLyBzaG93IGlmIGBzdGF0aWNfdHJlZWAgaGFzIGRhdGEgb3IgZHVtbXkgLSBuZWVkZWQgZm9yIG1vbm9tb3JwaGljIG9iamVjdHNcbiAgdGhpcy5oYXNfc3RyZWUgICAgPSBzdGF0aWNfdHJlZSAmJiBzdGF0aWNfdHJlZS5sZW5ndGg7XG59XG5cblxudmFyIHN0YXRpY19sX2Rlc2M7XG52YXIgc3RhdGljX2RfZGVzYztcbnZhciBzdGF0aWNfYmxfZGVzYztcblxuXG5mdW5jdGlvbiBUcmVlRGVzYyhkeW5fdHJlZSwgc3RhdF9kZXNjKSB7XG4gIHRoaXMuZHluX3RyZWUgPSBkeW5fdHJlZTsgICAgIC8qIHRoZSBkeW5hbWljIHRyZWUgKi9cbiAgdGhpcy5tYXhfY29kZSA9IDA7ICAgICAgICAgICAgLyogbGFyZ2VzdCBjb2RlIHdpdGggbm9uIHplcm8gZnJlcXVlbmN5ICovXG4gIHRoaXMuc3RhdF9kZXNjID0gc3RhdF9kZXNjOyAgIC8qIHRoZSBjb3JyZXNwb25kaW5nIHN0YXRpYyB0cmVlICovXG59XG5cblxuXG5mdW5jdGlvbiBkX2NvZGUoZGlzdCkge1xuICByZXR1cm4gZGlzdCA8IDI1NiA/IF9kaXN0X2NvZGVbZGlzdF0gOiBfZGlzdF9jb2RlWzI1NiArIChkaXN0ID4+PiA3KV07XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBPdXRwdXQgYSBzaG9ydCBMU0IgZmlyc3Qgb24gdGhlIHN0cmVhbS5cbiAqIElOIGFzc2VydGlvbjogdGhlcmUgaXMgZW5vdWdoIHJvb20gaW4gcGVuZGluZ0J1Zi5cbiAqL1xuZnVuY3Rpb24gcHV0X3Nob3J0KHMsIHcpIHtcbi8vICAgIHB1dF9ieXRlKHMsICh1Y2gpKCh3KSAmIDB4ZmYpKTtcbi8vICAgIHB1dF9ieXRlKHMsICh1Y2gpKCh1c2gpKHcpID4+IDgpKTtcbiAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSAodykgJiAweGZmO1xuICBzLnBlbmRpbmdfYnVmW3MucGVuZGluZysrXSA9ICh3ID4+PiA4KSAmIDB4ZmY7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIGEgdmFsdWUgb24gYSBnaXZlbiBudW1iZXIgb2YgYml0cy5cbiAqIElOIGFzc2VydGlvbjogbGVuZ3RoIDw9IDE2IGFuZCB2YWx1ZSBmaXRzIGluIGxlbmd0aCBiaXRzLlxuICovXG5mdW5jdGlvbiBzZW5kX2JpdHMocywgdmFsdWUsIGxlbmd0aCkge1xuICBpZiAocy5iaV92YWxpZCA+IChCdWZfc2l6ZSAtIGxlbmd0aCkpIHtcbiAgICBzLmJpX2J1ZiB8PSAodmFsdWUgPDwgcy5iaV92YWxpZCkgJiAweGZmZmY7XG4gICAgcHV0X3Nob3J0KHMsIHMuYmlfYnVmKTtcbiAgICBzLmJpX2J1ZiA9IHZhbHVlID4+IChCdWZfc2l6ZSAtIHMuYmlfdmFsaWQpO1xuICAgIHMuYmlfdmFsaWQgKz0gbGVuZ3RoIC0gQnVmX3NpemU7XG4gIH0gZWxzZSB7XG4gICAgcy5iaV9idWYgfD0gKHZhbHVlIDw8IHMuYmlfdmFsaWQpICYgMHhmZmZmO1xuICAgIHMuYmlfdmFsaWQgKz0gbGVuZ3RoO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc2VuZF9jb2RlKHMsIGMsIHRyZWUpIHtcbiAgc2VuZF9iaXRzKHMsIHRyZWVbYyAqIDJdLyouQ29kZSovLCB0cmVlW2MgKiAyICsgMV0vKi5MZW4qLyk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBSZXZlcnNlIHRoZSBmaXJzdCBsZW4gYml0cyBvZiBhIGNvZGUsIHVzaW5nIHN0cmFpZ2h0Zm9yd2FyZCBjb2RlIChhIGZhc3RlclxuICogbWV0aG9kIHdvdWxkIHVzZSBhIHRhYmxlKVxuICogSU4gYXNzZXJ0aW9uOiAxIDw9IGxlbiA8PSAxNVxuICovXG5mdW5jdGlvbiBiaV9yZXZlcnNlKGNvZGUsIGxlbikge1xuICB2YXIgcmVzID0gMDtcbiAgZG8ge1xuICAgIHJlcyB8PSBjb2RlICYgMTtcbiAgICBjb2RlID4+Pj0gMTtcbiAgICByZXMgPDw9IDE7XG4gIH0gd2hpbGUgKC0tbGVuID4gMCk7XG4gIHJldHVybiByZXMgPj4+IDE7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGbHVzaCB0aGUgYml0IGJ1ZmZlciwga2VlcGluZyBhdCBtb3N0IDcgYml0cyBpbiBpdC5cbiAqL1xuZnVuY3Rpb24gYmlfZmx1c2gocykge1xuICBpZiAocy5iaV92YWxpZCA9PT0gMTYpIHtcbiAgICBwdXRfc2hvcnQocywgcy5iaV9idWYpO1xuICAgIHMuYmlfYnVmID0gMDtcbiAgICBzLmJpX3ZhbGlkID0gMDtcblxuICB9IGVsc2UgaWYgKHMuYmlfdmFsaWQgPj0gOCkge1xuICAgIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gcy5iaV9idWYgJiAweGZmO1xuICAgIHMuYmlfYnVmID4+PSA4O1xuICAgIHMuYmlfdmFsaWQgLT0gODtcbiAgfVxufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29tcHV0ZSB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RocyBmb3IgYSB0cmVlIGFuZCB1cGRhdGUgdGhlIHRvdGFsIGJpdCBsZW5ndGhcbiAqIGZvciB0aGUgY3VycmVudCBibG9jay5cbiAqIElOIGFzc2VydGlvbjogdGhlIGZpZWxkcyBmcmVxIGFuZCBkYWQgYXJlIHNldCwgaGVhcFtoZWFwX21heF0gYW5kXG4gKiAgICBhYm92ZSBhcmUgdGhlIHRyZWUgbm9kZXMgc29ydGVkIGJ5IGluY3JlYXNpbmcgZnJlcXVlbmN5LlxuICogT1VUIGFzc2VydGlvbnM6IHRoZSBmaWVsZCBsZW4gaXMgc2V0IHRvIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGgsIHRoZVxuICogICAgIGFycmF5IGJsX2NvdW50IGNvbnRhaW5zIHRoZSBmcmVxdWVuY2llcyBmb3IgZWFjaCBiaXQgbGVuZ3RoLlxuICogICAgIFRoZSBsZW5ndGggb3B0X2xlbiBpcyB1cGRhdGVkOyBzdGF0aWNfbGVuIGlzIGFsc28gdXBkYXRlZCBpZiBzdHJlZSBpc1xuICogICAgIG5vdCBudWxsLlxuICovXG5mdW5jdGlvbiBnZW5fYml0bGVuKHMsIGRlc2MpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgdHJlZV9kZXNjICpkZXNjOyAgICAvKiB0aGUgdHJlZSBkZXNjcmlwdG9yICovXG57XG4gIHZhciB0cmVlICAgICAgICAgICAgPSBkZXNjLmR5bl90cmVlO1xuICB2YXIgbWF4X2NvZGUgICAgICAgID0gZGVzYy5tYXhfY29kZTtcbiAgdmFyIHN0cmVlICAgICAgICAgICA9IGRlc2Muc3RhdF9kZXNjLnN0YXRpY190cmVlO1xuICB2YXIgaGFzX3N0cmVlICAgICAgID0gZGVzYy5zdGF0X2Rlc2MuaGFzX3N0cmVlO1xuICB2YXIgZXh0cmEgICAgICAgICAgID0gZGVzYy5zdGF0X2Rlc2MuZXh0cmFfYml0cztcbiAgdmFyIGJhc2UgICAgICAgICAgICA9IGRlc2Muc3RhdF9kZXNjLmV4dHJhX2Jhc2U7XG4gIHZhciBtYXhfbGVuZ3RoICAgICAgPSBkZXNjLnN0YXRfZGVzYy5tYXhfbGVuZ3RoO1xuICB2YXIgaDsgICAgICAgICAgICAgIC8qIGhlYXAgaW5kZXggKi9cbiAgdmFyIG4sIG07ICAgICAgICAgICAvKiBpdGVyYXRlIG92ZXIgdGhlIHRyZWUgZWxlbWVudHMgKi9cbiAgdmFyIGJpdHM7ICAgICAgICAgICAvKiBiaXQgbGVuZ3RoICovXG4gIHZhciB4Yml0czsgICAgICAgICAgLyogZXh0cmEgYml0cyAqL1xuICB2YXIgZjsgICAgICAgICAgICAgIC8qIGZyZXF1ZW5jeSAqL1xuICB2YXIgb3ZlcmZsb3cgPSAwOyAgIC8qIG51bWJlciBvZiBlbGVtZW50cyB3aXRoIGJpdCBsZW5ndGggdG9vIGxhcmdlICovXG5cbiAgZm9yIChiaXRzID0gMDsgYml0cyA8PSBNQVhfQklUUzsgYml0cysrKSB7XG4gICAgcy5ibF9jb3VudFtiaXRzXSA9IDA7XG4gIH1cblxuICAvKiBJbiBhIGZpcnN0IHBhc3MsIGNvbXB1dGUgdGhlIG9wdGltYWwgYml0IGxlbmd0aHMgKHdoaWNoIG1heVxuICAgKiBvdmVyZmxvdyBpbiB0aGUgY2FzZSBvZiB0aGUgYml0IGxlbmd0aCB0cmVlKS5cbiAgICovXG4gIHRyZWVbcy5oZWFwW3MuaGVhcF9tYXhdICogMiArIDFdLyouTGVuKi8gPSAwOyAvKiByb290IG9mIHRoZSBoZWFwICovXG5cbiAgZm9yIChoID0gcy5oZWFwX21heCArIDE7IGggPCBIRUFQX1NJWkU7IGgrKykge1xuICAgIG4gPSBzLmhlYXBbaF07XG4gICAgYml0cyA9IHRyZWVbdHJlZVtuICogMiArIDFdLyouRGFkKi8gKiAyICsgMV0vKi5MZW4qLyArIDE7XG4gICAgaWYgKGJpdHMgPiBtYXhfbGVuZ3RoKSB7XG4gICAgICBiaXRzID0gbWF4X2xlbmd0aDtcbiAgICAgIG92ZXJmbG93Kys7XG4gICAgfVxuICAgIHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gYml0cztcbiAgICAvKiBXZSBvdmVyd3JpdGUgdHJlZVtuXS5EYWQgd2hpY2ggaXMgbm8gbG9uZ2VyIG5lZWRlZCAqL1xuXG4gICAgaWYgKG4gPiBtYXhfY29kZSkgeyBjb250aW51ZTsgfSAvKiBub3QgYSBsZWFmIG5vZGUgKi9cblxuICAgIHMuYmxfY291bnRbYml0c10rKztcbiAgICB4Yml0cyA9IDA7XG4gICAgaWYgKG4gPj0gYmFzZSkge1xuICAgICAgeGJpdHMgPSBleHRyYVtuIC0gYmFzZV07XG4gICAgfVxuICAgIGYgPSB0cmVlW24gKiAyXS8qLkZyZXEqLztcbiAgICBzLm9wdF9sZW4gKz0gZiAqIChiaXRzICsgeGJpdHMpO1xuICAgIGlmIChoYXNfc3RyZWUpIHtcbiAgICAgIHMuc3RhdGljX2xlbiArPSBmICogKHN0cmVlW24gKiAyICsgMV0vKi5MZW4qLyArIHhiaXRzKTtcbiAgICB9XG4gIH1cbiAgaWYgKG92ZXJmbG93ID09PSAwKSB7IHJldHVybjsgfVxuXG4gIC8vIFRyYWNlKChzdGRlcnIsXCJcXG5iaXQgbGVuZ3RoIG92ZXJmbG93XFxuXCIpKTtcbiAgLyogVGhpcyBoYXBwZW5zIGZvciBleGFtcGxlIG9uIG9iajIgYW5kIHBpYyBvZiB0aGUgQ2FsZ2FyeSBjb3JwdXMgKi9cblxuICAvKiBGaW5kIHRoZSBmaXJzdCBiaXQgbGVuZ3RoIHdoaWNoIGNvdWxkIGluY3JlYXNlOiAqL1xuICBkbyB7XG4gICAgYml0cyA9IG1heF9sZW5ndGggLSAxO1xuICAgIHdoaWxlIChzLmJsX2NvdW50W2JpdHNdID09PSAwKSB7IGJpdHMtLTsgfVxuICAgIHMuYmxfY291bnRbYml0c10tLTsgICAgICAvKiBtb3ZlIG9uZSBsZWFmIGRvd24gdGhlIHRyZWUgKi9cbiAgICBzLmJsX2NvdW50W2JpdHMgKyAxXSArPSAyOyAvKiBtb3ZlIG9uZSBvdmVyZmxvdyBpdGVtIGFzIGl0cyBicm90aGVyICovXG4gICAgcy5ibF9jb3VudFttYXhfbGVuZ3RoXS0tO1xuICAgIC8qIFRoZSBicm90aGVyIG9mIHRoZSBvdmVyZmxvdyBpdGVtIGFsc28gbW92ZXMgb25lIHN0ZXAgdXAsXG4gICAgICogYnV0IHRoaXMgZG9lcyBub3QgYWZmZWN0IGJsX2NvdW50W21heF9sZW5ndGhdXG4gICAgICovXG4gICAgb3ZlcmZsb3cgLT0gMjtcbiAgfSB3aGlsZSAob3ZlcmZsb3cgPiAwKTtcblxuICAvKiBOb3cgcmVjb21wdXRlIGFsbCBiaXQgbGVuZ3Rocywgc2Nhbm5pbmcgaW4gaW5jcmVhc2luZyBmcmVxdWVuY3kuXG4gICAqIGggaXMgc3RpbGwgZXF1YWwgdG8gSEVBUF9TSVpFLiAoSXQgaXMgc2ltcGxlciB0byByZWNvbnN0cnVjdCBhbGxcbiAgICogbGVuZ3RocyBpbnN0ZWFkIG9mIGZpeGluZyBvbmx5IHRoZSB3cm9uZyBvbmVzLiBUaGlzIGlkZWEgaXMgdGFrZW5cbiAgICogZnJvbSAnYXInIHdyaXR0ZW4gYnkgSGFydWhpa28gT2t1bXVyYS4pXG4gICAqL1xuICBmb3IgKGJpdHMgPSBtYXhfbGVuZ3RoOyBiaXRzICE9PSAwOyBiaXRzLS0pIHtcbiAgICBuID0gcy5ibF9jb3VudFtiaXRzXTtcbiAgICB3aGlsZSAobiAhPT0gMCkge1xuICAgICAgbSA9IHMuaGVhcFstLWhdO1xuICAgICAgaWYgKG0gPiBtYXhfY29kZSkgeyBjb250aW51ZTsgfVxuICAgICAgaWYgKHRyZWVbbSAqIDIgKyAxXS8qLkxlbiovICE9PSBiaXRzKSB7XG4gICAgICAgIC8vIFRyYWNlKChzdGRlcnIsXCJjb2RlICVkIGJpdHMgJWQtPiVkXFxuXCIsIG0sIHRyZWVbbV0uTGVuLCBiaXRzKSk7XG4gICAgICAgIHMub3B0X2xlbiArPSAoYml0cyAtIHRyZWVbbSAqIDIgKyAxXS8qLkxlbiovKSAqIHRyZWVbbSAqIDJdLyouRnJlcSovO1xuICAgICAgICB0cmVlW20gKiAyICsgMV0vKi5MZW4qLyA9IGJpdHM7XG4gICAgICB9XG4gICAgICBuLS07XG4gICAgfVxuICB9XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBHZW5lcmF0ZSB0aGUgY29kZXMgZm9yIGEgZ2l2ZW4gdHJlZSBhbmQgYml0IGNvdW50cyAod2hpY2ggbmVlZCBub3QgYmVcbiAqIG9wdGltYWwpLlxuICogSU4gYXNzZXJ0aW9uOiB0aGUgYXJyYXkgYmxfY291bnQgY29udGFpbnMgdGhlIGJpdCBsZW5ndGggc3RhdGlzdGljcyBmb3JcbiAqIHRoZSBnaXZlbiB0cmVlIGFuZCB0aGUgZmllbGQgbGVuIGlzIHNldCBmb3IgYWxsIHRyZWUgZWxlbWVudHMuXG4gKiBPVVQgYXNzZXJ0aW9uOiB0aGUgZmllbGQgY29kZSBpcyBzZXQgZm9yIGFsbCB0cmVlIGVsZW1lbnRzIG9mIG5vblxuICogICAgIHplcm8gY29kZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIGdlbl9jb2Rlcyh0cmVlLCBtYXhfY29kZSwgYmxfY291bnQpXG4vLyAgICBjdF9kYXRhICp0cmVlOyAgICAgICAgICAgICAvKiB0aGUgdHJlZSB0byBkZWNvcmF0ZSAqL1xuLy8gICAgaW50IG1heF9jb2RlOyAgICAgICAgICAgICAgLyogbGFyZ2VzdCBjb2RlIHdpdGggbm9uIHplcm8gZnJlcXVlbmN5ICovXG4vLyAgICB1c2hmICpibF9jb3VudDsgICAgICAgICAgICAvKiBudW1iZXIgb2YgY29kZXMgYXQgZWFjaCBiaXQgbGVuZ3RoICovXG57XG4gIHZhciBuZXh0X2NvZGUgPSBuZXcgQXJyYXkoTUFYX0JJVFMgKyAxKTsgLyogbmV4dCBjb2RlIHZhbHVlIGZvciBlYWNoIGJpdCBsZW5ndGggKi9cbiAgdmFyIGNvZGUgPSAwOyAgICAgICAgICAgICAgLyogcnVubmluZyBjb2RlIHZhbHVlICovXG4gIHZhciBiaXRzOyAgICAgICAgICAgICAgICAgIC8qIGJpdCBpbmRleCAqL1xuICB2YXIgbjsgICAgICAgICAgICAgICAgICAgICAvKiBjb2RlIGluZGV4ICovXG5cbiAgLyogVGhlIGRpc3RyaWJ1dGlvbiBjb3VudHMgYXJlIGZpcnN0IHVzZWQgdG8gZ2VuZXJhdGUgdGhlIGNvZGUgdmFsdWVzXG4gICAqIHdpdGhvdXQgYml0IHJldmVyc2FsLlxuICAgKi9cbiAgZm9yIChiaXRzID0gMTsgYml0cyA8PSBNQVhfQklUUzsgYml0cysrKSB7XG4gICAgbmV4dF9jb2RlW2JpdHNdID0gY29kZSA9IChjb2RlICsgYmxfY291bnRbYml0cyAtIDFdKSA8PCAxO1xuICB9XG4gIC8qIENoZWNrIHRoYXQgdGhlIGJpdCBjb3VudHMgaW4gYmxfY291bnQgYXJlIGNvbnNpc3RlbnQuIFRoZSBsYXN0IGNvZGVcbiAgICogbXVzdCBiZSBhbGwgb25lcy5cbiAgICovXG4gIC8vQXNzZXJ0IChjb2RlICsgYmxfY291bnRbTUFYX0JJVFNdLTEgPT0gKDE8PE1BWF9CSVRTKS0xLFxuICAvLyAgICAgICAgXCJpbmNvbnNpc3RlbnQgYml0IGNvdW50c1wiKTtcbiAgLy9UcmFjZXYoKHN0ZGVycixcIlxcbmdlbl9jb2RlczogbWF4X2NvZGUgJWQgXCIsIG1heF9jb2RlKSk7XG5cbiAgZm9yIChuID0gMDsgIG4gPD0gbWF4X2NvZGU7IG4rKykge1xuICAgIHZhciBsZW4gPSB0cmVlW24gKiAyICsgMV0vKi5MZW4qLztcbiAgICBpZiAobGVuID09PSAwKSB7IGNvbnRpbnVlOyB9XG4gICAgLyogTm93IHJldmVyc2UgdGhlIGJpdHMgKi9cbiAgICB0cmVlW24gKiAyXS8qLkNvZGUqLyA9IGJpX3JldmVyc2UobmV4dF9jb2RlW2xlbl0rKywgbGVuKTtcblxuICAgIC8vVHJhY2Vjdih0cmVlICE9IHN0YXRpY19sdHJlZSwgKHN0ZGVycixcIlxcbm4gJTNkICVjIGwgJTJkIGMgJTR4ICgleCkgXCIsXG4gICAgLy8gICAgIG4sIChpc2dyYXBoKG4pID8gbiA6ICcgJyksIGxlbiwgdHJlZVtuXS5Db2RlLCBuZXh0X2NvZGVbbGVuXS0xKSk7XG4gIH1cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEluaXRpYWxpemUgdGhlIHZhcmlvdXMgJ2NvbnN0YW50JyB0YWJsZXMuXG4gKi9cbmZ1bmN0aW9uIHRyX3N0YXRpY19pbml0KCkge1xuICB2YXIgbjsgICAgICAgIC8qIGl0ZXJhdGVzIG92ZXIgdHJlZSBlbGVtZW50cyAqL1xuICB2YXIgYml0czsgICAgIC8qIGJpdCBjb3VudGVyICovXG4gIHZhciBsZW5ndGg7ICAgLyogbGVuZ3RoIHZhbHVlICovXG4gIHZhciBjb2RlOyAgICAgLyogY29kZSB2YWx1ZSAqL1xuICB2YXIgZGlzdDsgICAgIC8qIGRpc3RhbmNlIGluZGV4ICovXG4gIHZhciBibF9jb3VudCA9IG5ldyBBcnJheShNQVhfQklUUyArIDEpO1xuICAvKiBudW1iZXIgb2YgY29kZXMgYXQgZWFjaCBiaXQgbGVuZ3RoIGZvciBhbiBvcHRpbWFsIHRyZWUgKi9cblxuICAvLyBkbyBjaGVjayBpbiBfdHJfaW5pdCgpXG4gIC8vaWYgKHN0YXRpY19pbml0X2RvbmUpIHJldHVybjtcblxuICAvKiBGb3Igc29tZSBlbWJlZGRlZCB0YXJnZXRzLCBnbG9iYWwgdmFyaWFibGVzIGFyZSBub3QgaW5pdGlhbGl6ZWQ6ICovXG4vKiNpZmRlZiBOT19JTklUX0dMT0JBTF9QT0lOVEVSU1xuICBzdGF0aWNfbF9kZXNjLnN0YXRpY190cmVlID0gc3RhdGljX2x0cmVlO1xuICBzdGF0aWNfbF9kZXNjLmV4dHJhX2JpdHMgPSBleHRyYV9sYml0cztcbiAgc3RhdGljX2RfZGVzYy5zdGF0aWNfdHJlZSA9IHN0YXRpY19kdHJlZTtcbiAgc3RhdGljX2RfZGVzYy5leHRyYV9iaXRzID0gZXh0cmFfZGJpdHM7XG4gIHN0YXRpY19ibF9kZXNjLmV4dHJhX2JpdHMgPSBleHRyYV9ibGJpdHM7XG4jZW5kaWYqL1xuXG4gIC8qIEluaXRpYWxpemUgdGhlIG1hcHBpbmcgbGVuZ3RoICgwLi4yNTUpIC0+IGxlbmd0aCBjb2RlICgwLi4yOCkgKi9cbiAgbGVuZ3RoID0gMDtcbiAgZm9yIChjb2RlID0gMDsgY29kZSA8IExFTkdUSF9DT0RFUyAtIDE7IGNvZGUrKykge1xuICAgIGJhc2VfbGVuZ3RoW2NvZGVdID0gbGVuZ3RoO1xuICAgIGZvciAobiA9IDA7IG4gPCAoMSA8PCBleHRyYV9sYml0c1tjb2RlXSk7IG4rKykge1xuICAgICAgX2xlbmd0aF9jb2RlW2xlbmd0aCsrXSA9IGNvZGU7XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChsZW5ndGggPT0gMjU2LCBcInRyX3N0YXRpY19pbml0OiBsZW5ndGggIT0gMjU2XCIpO1xuICAvKiBOb3RlIHRoYXQgdGhlIGxlbmd0aCAyNTUgKG1hdGNoIGxlbmd0aCAyNTgpIGNhbiBiZSByZXByZXNlbnRlZFxuICAgKiBpbiB0d28gZGlmZmVyZW50IHdheXM6IGNvZGUgMjg0ICsgNSBiaXRzIG9yIGNvZGUgMjg1LCBzbyB3ZVxuICAgKiBvdmVyd3JpdGUgbGVuZ3RoX2NvZGVbMjU1XSB0byB1c2UgdGhlIGJlc3QgZW5jb2Rpbmc6XG4gICAqL1xuICBfbGVuZ3RoX2NvZGVbbGVuZ3RoIC0gMV0gPSBjb2RlO1xuXG4gIC8qIEluaXRpYWxpemUgdGhlIG1hcHBpbmcgZGlzdCAoMC4uMzJLKSAtPiBkaXN0IGNvZGUgKDAuLjI5KSAqL1xuICBkaXN0ID0gMDtcbiAgZm9yIChjb2RlID0gMDsgY29kZSA8IDE2OyBjb2RlKyspIHtcbiAgICBiYXNlX2Rpc3RbY29kZV0gPSBkaXN0O1xuICAgIGZvciAobiA9IDA7IG4gPCAoMSA8PCBleHRyYV9kYml0c1tjb2RlXSk7IG4rKykge1xuICAgICAgX2Rpc3RfY29kZVtkaXN0KytdID0gY29kZTtcbiAgICB9XG4gIH1cbiAgLy9Bc3NlcnQgKGRpc3QgPT0gMjU2LCBcInRyX3N0YXRpY19pbml0OiBkaXN0ICE9IDI1NlwiKTtcbiAgZGlzdCA+Pj0gNzsgLyogZnJvbSBub3cgb24sIGFsbCBkaXN0YW5jZXMgYXJlIGRpdmlkZWQgYnkgMTI4ICovXG4gIGZvciAoOyBjb2RlIDwgRF9DT0RFUzsgY29kZSsrKSB7XG4gICAgYmFzZV9kaXN0W2NvZGVdID0gZGlzdCA8PCA3O1xuICAgIGZvciAobiA9IDA7IG4gPCAoMSA8PCAoZXh0cmFfZGJpdHNbY29kZV0gLSA3KSk7IG4rKykge1xuICAgICAgX2Rpc3RfY29kZVsyNTYgKyBkaXN0KytdID0gY29kZTtcbiAgICB9XG4gIH1cbiAgLy9Bc3NlcnQgKGRpc3QgPT0gMjU2LCBcInRyX3N0YXRpY19pbml0OiAyNTYrZGlzdCAhPSA1MTJcIik7XG5cbiAgLyogQ29uc3RydWN0IHRoZSBjb2RlcyBvZiB0aGUgc3RhdGljIGxpdGVyYWwgdHJlZSAqL1xuICBmb3IgKGJpdHMgPSAwOyBiaXRzIDw9IE1BWF9CSVRTOyBiaXRzKyspIHtcbiAgICBibF9jb3VudFtiaXRzXSA9IDA7XG4gIH1cblxuICBuID0gMDtcbiAgd2hpbGUgKG4gPD0gMTQzKSB7XG4gICAgc3RhdGljX2x0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDg7XG4gICAgbisrO1xuICAgIGJsX2NvdW50WzhdKys7XG4gIH1cbiAgd2hpbGUgKG4gPD0gMjU1KSB7XG4gICAgc3RhdGljX2x0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDk7XG4gICAgbisrO1xuICAgIGJsX2NvdW50WzldKys7XG4gIH1cbiAgd2hpbGUgKG4gPD0gMjc5KSB7XG4gICAgc3RhdGljX2x0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDc7XG4gICAgbisrO1xuICAgIGJsX2NvdW50WzddKys7XG4gIH1cbiAgd2hpbGUgKG4gPD0gMjg3KSB7XG4gICAgc3RhdGljX2x0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDg7XG4gICAgbisrO1xuICAgIGJsX2NvdW50WzhdKys7XG4gIH1cbiAgLyogQ29kZXMgMjg2IGFuZCAyODcgZG8gbm90IGV4aXN0LCBidXQgd2UgbXVzdCBpbmNsdWRlIHRoZW0gaW4gdGhlXG4gICAqIHRyZWUgY29uc3RydWN0aW9uIHRvIGdldCBhIGNhbm9uaWNhbCBIdWZmbWFuIHRyZWUgKGxvbmdlc3QgY29kZVxuICAgKiBhbGwgb25lcylcbiAgICovXG4gIGdlbl9jb2RlcyhzdGF0aWNfbHRyZWUsIExfQ09ERVMgKyAxLCBibF9jb3VudCk7XG5cbiAgLyogVGhlIHN0YXRpYyBkaXN0YW5jZSB0cmVlIGlzIHRyaXZpYWw6ICovXG4gIGZvciAobiA9IDA7IG4gPCBEX0NPREVTOyBuKyspIHtcbiAgICBzdGF0aWNfZHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gNTtcbiAgICBzdGF0aWNfZHRyZWVbbiAqIDJdLyouQ29kZSovID0gYmlfcmV2ZXJzZShuLCA1KTtcbiAgfVxuXG4gIC8vIE5vdyBkYXRhIHJlYWR5IGFuZCB3ZSBjYW4gaW5pdCBzdGF0aWMgdHJlZXNcbiAgc3RhdGljX2xfZGVzYyA9IG5ldyBTdGF0aWNUcmVlRGVzYyhzdGF0aWNfbHRyZWUsIGV4dHJhX2xiaXRzLCBMSVRFUkFMUyArIDEsIExfQ09ERVMsIE1BWF9CSVRTKTtcbiAgc3RhdGljX2RfZGVzYyA9IG5ldyBTdGF0aWNUcmVlRGVzYyhzdGF0aWNfZHRyZWUsIGV4dHJhX2RiaXRzLCAwLCAgICAgICAgICBEX0NPREVTLCBNQVhfQklUUyk7XG4gIHN0YXRpY19ibF9kZXNjID0gbmV3IFN0YXRpY1RyZWVEZXNjKG5ldyBBcnJheSgwKSwgZXh0cmFfYmxiaXRzLCAwLCAgICAgICAgIEJMX0NPREVTLCBNQVhfQkxfQklUUyk7XG5cbiAgLy9zdGF0aWNfaW5pdF9kb25lID0gdHJ1ZTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEluaXRpYWxpemUgYSBuZXcgYmxvY2suXG4gKi9cbmZ1bmN0aW9uIGluaXRfYmxvY2socykge1xuICB2YXIgbjsgLyogaXRlcmF0ZXMgb3ZlciB0cmVlIGVsZW1lbnRzICovXG5cbiAgLyogSW5pdGlhbGl6ZSB0aGUgdHJlZXMuICovXG4gIGZvciAobiA9IDA7IG4gPCBMX0NPREVTOyAgbisrKSB7IHMuZHluX2x0cmVlW24gKiAyXS8qLkZyZXEqLyA9IDA7IH1cbiAgZm9yIChuID0gMDsgbiA8IERfQ09ERVM7ICBuKyspIHsgcy5keW5fZHRyZWVbbiAqIDJdLyouRnJlcSovID0gMDsgfVxuICBmb3IgKG4gPSAwOyBuIDwgQkxfQ09ERVM7IG4rKykgeyBzLmJsX3RyZWVbbiAqIDJdLyouRnJlcSovID0gMDsgfVxuXG4gIHMuZHluX2x0cmVlW0VORF9CTE9DSyAqIDJdLyouRnJlcSovID0gMTtcbiAgcy5vcHRfbGVuID0gcy5zdGF0aWNfbGVuID0gMDtcbiAgcy5sYXN0X2xpdCA9IHMubWF0Y2hlcyA9IDA7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGbHVzaCB0aGUgYml0IGJ1ZmZlciBhbmQgYWxpZ24gdGhlIG91dHB1dCBvbiBhIGJ5dGUgYm91bmRhcnlcbiAqL1xuZnVuY3Rpb24gYmlfd2luZHVwKHMpXG57XG4gIGlmIChzLmJpX3ZhbGlkID4gOCkge1xuICAgIHB1dF9zaG9ydChzLCBzLmJpX2J1Zik7XG4gIH0gZWxzZSBpZiAocy5iaV92YWxpZCA+IDApIHtcbiAgICAvL3B1dF9ieXRlKHMsIChCeXRlKXMtPmJpX2J1Zik7XG4gICAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSBzLmJpX2J1ZjtcbiAgfVxuICBzLmJpX2J1ZiA9IDA7XG4gIHMuYmlfdmFsaWQgPSAwO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHkgYSBzdG9yZWQgYmxvY2ssIHN0b3JpbmcgZmlyc3QgdGhlIGxlbmd0aCBhbmQgaXRzXG4gKiBvbmUncyBjb21wbGVtZW50IGlmIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gY29weV9ibG9jayhzLCBidWYsIGxlbiwgaGVhZGVyKVxuLy9EZWZsYXRlU3RhdGUgKnM7XG4vL2NoYXJmICAgICpidWY7ICAgIC8qIHRoZSBpbnB1dCBkYXRhICovXG4vL3Vuc2lnbmVkIGxlbjsgICAgIC8qIGl0cyBsZW5ndGggKi9cbi8vaW50ICAgICAgaGVhZGVyOyAgLyogdHJ1ZSBpZiBibG9jayBoZWFkZXIgbXVzdCBiZSB3cml0dGVuICovXG57XG4gIGJpX3dpbmR1cChzKTsgICAgICAgIC8qIGFsaWduIG9uIGJ5dGUgYm91bmRhcnkgKi9cblxuICBpZiAoaGVhZGVyKSB7XG4gICAgcHV0X3Nob3J0KHMsIGxlbik7XG4gICAgcHV0X3Nob3J0KHMsIH5sZW4pO1xuICB9XG4vLyAgd2hpbGUgKGxlbi0tKSB7XG4vLyAgICBwdXRfYnl0ZShzLCAqYnVmKyspO1xuLy8gIH1cbiAgdXRpbHMuYXJyYXlTZXQocy5wZW5kaW5nX2J1Ziwgcy53aW5kb3csIGJ1ZiwgbGVuLCBzLnBlbmRpbmcpO1xuICBzLnBlbmRpbmcgKz0gbGVuO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvbXBhcmVzIHRvIHN1YnRyZWVzLCB1c2luZyB0aGUgdHJlZSBkZXB0aCBhcyB0aWUgYnJlYWtlciB3aGVuXG4gKiB0aGUgc3VidHJlZXMgaGF2ZSBlcXVhbCBmcmVxdWVuY3kuIFRoaXMgbWluaW1pemVzIHRoZSB3b3JzdCBjYXNlIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gc21hbGxlcih0cmVlLCBuLCBtLCBkZXB0aCkge1xuICB2YXIgX24yID0gbiAqIDI7XG4gIHZhciBfbTIgPSBtICogMjtcbiAgcmV0dXJuICh0cmVlW19uMl0vKi5GcmVxKi8gPCB0cmVlW19tMl0vKi5GcmVxKi8gfHxcbiAgICAgICAgICh0cmVlW19uMl0vKi5GcmVxKi8gPT09IHRyZWVbX20yXS8qLkZyZXEqLyAmJiBkZXB0aFtuXSA8PSBkZXB0aFttXSkpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFJlc3RvcmUgdGhlIGhlYXAgcHJvcGVydHkgYnkgbW92aW5nIGRvd24gdGhlIHRyZWUgc3RhcnRpbmcgYXQgbm9kZSBrLFxuICogZXhjaGFuZ2luZyBhIG5vZGUgd2l0aCB0aGUgc21hbGxlc3Qgb2YgaXRzIHR3byBzb25zIGlmIG5lY2Vzc2FyeSwgc3RvcHBpbmdcbiAqIHdoZW4gdGhlIGhlYXAgcHJvcGVydHkgaXMgcmUtZXN0YWJsaXNoZWQgKGVhY2ggZmF0aGVyIHNtYWxsZXIgdGhhbiBpdHNcbiAqIHR3byBzb25zKS5cbiAqL1xuZnVuY3Rpb24gcHFkb3duaGVhcChzLCB0cmVlLCBrKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIGN0X2RhdGEgKnRyZWU7ICAvKiB0aGUgdHJlZSB0byByZXN0b3JlICovXG4vLyAgICBpbnQgazsgICAgICAgICAgICAgICAvKiBub2RlIHRvIG1vdmUgZG93biAqL1xue1xuICB2YXIgdiA9IHMuaGVhcFtrXTtcbiAgdmFyIGogPSBrIDw8IDE7ICAvKiBsZWZ0IHNvbiBvZiBrICovXG4gIHdoaWxlIChqIDw9IHMuaGVhcF9sZW4pIHtcbiAgICAvKiBTZXQgaiB0byB0aGUgc21hbGxlc3Qgb2YgdGhlIHR3byBzb25zOiAqL1xuICAgIGlmIChqIDwgcy5oZWFwX2xlbiAmJlxuICAgICAgc21hbGxlcih0cmVlLCBzLmhlYXBbaiArIDFdLCBzLmhlYXBbal0sIHMuZGVwdGgpKSB7XG4gICAgICBqKys7XG4gICAgfVxuICAgIC8qIEV4aXQgaWYgdiBpcyBzbWFsbGVyIHRoYW4gYm90aCBzb25zICovXG4gICAgaWYgKHNtYWxsZXIodHJlZSwgdiwgcy5oZWFwW2pdLCBzLmRlcHRoKSkgeyBicmVhazsgfVxuXG4gICAgLyogRXhjaGFuZ2UgdiB3aXRoIHRoZSBzbWFsbGVzdCBzb24gKi9cbiAgICBzLmhlYXBba10gPSBzLmhlYXBbal07XG4gICAgayA9IGo7XG5cbiAgICAvKiBBbmQgY29udGludWUgZG93biB0aGUgdHJlZSwgc2V0dGluZyBqIHRvIHRoZSBsZWZ0IHNvbiBvZiBrICovXG4gICAgaiA8PD0gMTtcbiAgfVxuICBzLmhlYXBba10gPSB2O1xufVxuXG5cbi8vIGlubGluZWQgbWFudWFsbHlcbi8vIHZhciBTTUFMTEVTVCA9IDE7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCB0aGUgYmxvY2sgZGF0YSBjb21wcmVzc2VkIHVzaW5nIHRoZSBnaXZlbiBIdWZmbWFuIHRyZWVzXG4gKi9cbmZ1bmN0aW9uIGNvbXByZXNzX2Jsb2NrKHMsIGx0cmVlLCBkdHJlZSlcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICBjb25zdCBjdF9kYXRhICpsdHJlZTsgLyogbGl0ZXJhbCB0cmVlICovXG4vLyAgICBjb25zdCBjdF9kYXRhICpkdHJlZTsgLyogZGlzdGFuY2UgdHJlZSAqL1xue1xuICB2YXIgZGlzdDsgICAgICAgICAgIC8qIGRpc3RhbmNlIG9mIG1hdGNoZWQgc3RyaW5nICovXG4gIHZhciBsYzsgICAgICAgICAgICAgLyogbWF0Y2ggbGVuZ3RoIG9yIHVubWF0Y2hlZCBjaGFyIChpZiBkaXN0ID09IDApICovXG4gIHZhciBseCA9IDA7ICAgICAgICAgLyogcnVubmluZyBpbmRleCBpbiBsX2J1ZiAqL1xuICB2YXIgY29kZTsgICAgICAgICAgIC8qIHRoZSBjb2RlIHRvIHNlbmQgKi9cbiAgdmFyIGV4dHJhOyAgICAgICAgICAvKiBudW1iZXIgb2YgZXh0cmEgYml0cyB0byBzZW5kICovXG5cbiAgaWYgKHMubGFzdF9saXQgIT09IDApIHtcbiAgICBkbyB7XG4gICAgICBkaXN0ID0gKHMucGVuZGluZ19idWZbcy5kX2J1ZiArIGx4ICogMl0gPDwgOCkgfCAocy5wZW5kaW5nX2J1ZltzLmRfYnVmICsgbHggKiAyICsgMV0pO1xuICAgICAgbGMgPSBzLnBlbmRpbmdfYnVmW3MubF9idWYgKyBseF07XG4gICAgICBseCsrO1xuXG4gICAgICBpZiAoZGlzdCA9PT0gMCkge1xuICAgICAgICBzZW5kX2NvZGUocywgbGMsIGx0cmVlKTsgLyogc2VuZCBhIGxpdGVyYWwgYnl0ZSAqL1xuICAgICAgICAvL1RyYWNlY3YoaXNncmFwaChsYyksIChzdGRlcnIsXCIgJyVjJyBcIiwgbGMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEhlcmUsIGxjIGlzIHRoZSBtYXRjaCBsZW5ndGggLSBNSU5fTUFUQ0ggKi9cbiAgICAgICAgY29kZSA9IF9sZW5ndGhfY29kZVtsY107XG4gICAgICAgIHNlbmRfY29kZShzLCBjb2RlICsgTElURVJBTFMgKyAxLCBsdHJlZSk7IC8qIHNlbmQgdGhlIGxlbmd0aCBjb2RlICovXG4gICAgICAgIGV4dHJhID0gZXh0cmFfbGJpdHNbY29kZV07XG4gICAgICAgIGlmIChleHRyYSAhPT0gMCkge1xuICAgICAgICAgIGxjIC09IGJhc2VfbGVuZ3RoW2NvZGVdO1xuICAgICAgICAgIHNlbmRfYml0cyhzLCBsYywgZXh0cmEpOyAgICAgICAvKiBzZW5kIHRoZSBleHRyYSBsZW5ndGggYml0cyAqL1xuICAgICAgICB9XG4gICAgICAgIGRpc3QtLTsgLyogZGlzdCBpcyBub3cgdGhlIG1hdGNoIGRpc3RhbmNlIC0gMSAqL1xuICAgICAgICBjb2RlID0gZF9jb2RlKGRpc3QpO1xuICAgICAgICAvL0Fzc2VydCAoY29kZSA8IERfQ09ERVMsIFwiYmFkIGRfY29kZVwiKTtcblxuICAgICAgICBzZW5kX2NvZGUocywgY29kZSwgZHRyZWUpOyAgICAgICAvKiBzZW5kIHRoZSBkaXN0YW5jZSBjb2RlICovXG4gICAgICAgIGV4dHJhID0gZXh0cmFfZGJpdHNbY29kZV07XG4gICAgICAgIGlmIChleHRyYSAhPT0gMCkge1xuICAgICAgICAgIGRpc3QgLT0gYmFzZV9kaXN0W2NvZGVdO1xuICAgICAgICAgIHNlbmRfYml0cyhzLCBkaXN0LCBleHRyYSk7ICAgLyogc2VuZCB0aGUgZXh0cmEgZGlzdGFuY2UgYml0cyAqL1xuICAgICAgICB9XG4gICAgICB9IC8qIGxpdGVyYWwgb3IgbWF0Y2ggcGFpciA/ICovXG5cbiAgICAgIC8qIENoZWNrIHRoYXQgdGhlIG92ZXJsYXkgYmV0d2VlbiBwZW5kaW5nX2J1ZiBhbmQgZF9idWYrbF9idWYgaXMgb2s6ICovXG4gICAgICAvL0Fzc2VydCgodUludCkocy0+cGVuZGluZykgPCBzLT5saXRfYnVmc2l6ZSArIDIqbHgsXG4gICAgICAvLyAgICAgICBcInBlbmRpbmdCdWYgb3ZlcmZsb3dcIik7XG5cbiAgICB9IHdoaWxlIChseCA8IHMubGFzdF9saXQpO1xuICB9XG5cbiAgc2VuZF9jb2RlKHMsIEVORF9CTE9DSywgbHRyZWUpO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29uc3RydWN0IG9uZSBIdWZmbWFuIHRyZWUgYW5kIGFzc2lnbnMgdGhlIGNvZGUgYml0IHN0cmluZ3MgYW5kIGxlbmd0aHMuXG4gKiBVcGRhdGUgdGhlIHRvdGFsIGJpdCBsZW5ndGggZm9yIHRoZSBjdXJyZW50IGJsb2NrLlxuICogSU4gYXNzZXJ0aW9uOiB0aGUgZmllbGQgZnJlcSBpcyBzZXQgZm9yIGFsbCB0cmVlIGVsZW1lbnRzLlxuICogT1VUIGFzc2VydGlvbnM6IHRoZSBmaWVsZHMgbGVuIGFuZCBjb2RlIGFyZSBzZXQgdG8gdGhlIG9wdGltYWwgYml0IGxlbmd0aFxuICogICAgIGFuZCBjb3JyZXNwb25kaW5nIGNvZGUuIFRoZSBsZW5ndGggb3B0X2xlbiBpcyB1cGRhdGVkOyBzdGF0aWNfbGVuIGlzXG4gKiAgICAgYWxzbyB1cGRhdGVkIGlmIHN0cmVlIGlzIG5vdCBudWxsLiBUaGUgZmllbGQgbWF4X2NvZGUgaXMgc2V0LlxuICovXG5mdW5jdGlvbiBidWlsZF90cmVlKHMsIGRlc2MpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgdHJlZV9kZXNjICpkZXNjOyAvKiB0aGUgdHJlZSBkZXNjcmlwdG9yICovXG57XG4gIHZhciB0cmVlICAgICA9IGRlc2MuZHluX3RyZWU7XG4gIHZhciBzdHJlZSAgICA9IGRlc2Muc3RhdF9kZXNjLnN0YXRpY190cmVlO1xuICB2YXIgaGFzX3N0cmVlID0gZGVzYy5zdGF0X2Rlc2MuaGFzX3N0cmVlO1xuICB2YXIgZWxlbXMgICAgPSBkZXNjLnN0YXRfZGVzYy5lbGVtcztcbiAgdmFyIG4sIG07ICAgICAgICAgIC8qIGl0ZXJhdGUgb3ZlciBoZWFwIGVsZW1lbnRzICovXG4gIHZhciBtYXhfY29kZSA9IC0xOyAvKiBsYXJnZXN0IGNvZGUgd2l0aCBub24gemVybyBmcmVxdWVuY3kgKi9cbiAgdmFyIG5vZGU7ICAgICAgICAgIC8qIG5ldyBub2RlIGJlaW5nIGNyZWF0ZWQgKi9cblxuICAvKiBDb25zdHJ1Y3QgdGhlIGluaXRpYWwgaGVhcCwgd2l0aCBsZWFzdCBmcmVxdWVudCBlbGVtZW50IGluXG4gICAqIGhlYXBbU01BTExFU1RdLiBUaGUgc29ucyBvZiBoZWFwW25dIGFyZSBoZWFwWzIqbl0gYW5kIGhlYXBbMipuKzFdLlxuICAgKiBoZWFwWzBdIGlzIG5vdCB1c2VkLlxuICAgKi9cbiAgcy5oZWFwX2xlbiA9IDA7XG4gIHMuaGVhcF9tYXggPSBIRUFQX1NJWkU7XG5cbiAgZm9yIChuID0gMDsgbiA8IGVsZW1zOyBuKyspIHtcbiAgICBpZiAodHJlZVtuICogMl0vKi5GcmVxKi8gIT09IDApIHtcbiAgICAgIHMuaGVhcFsrK3MuaGVhcF9sZW5dID0gbWF4X2NvZGUgPSBuO1xuICAgICAgcy5kZXB0aFtuXSA9IDA7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qIFRoZSBwa3ppcCBmb3JtYXQgcmVxdWlyZXMgdGhhdCBhdCBsZWFzdCBvbmUgZGlzdGFuY2UgY29kZSBleGlzdHMsXG4gICAqIGFuZCB0aGF0IGF0IGxlYXN0IG9uZSBiaXQgc2hvdWxkIGJlIHNlbnQgZXZlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZVxuICAgKiBwb3NzaWJsZSBjb2RlLiBTbyB0byBhdm9pZCBzcGVjaWFsIGNoZWNrcyBsYXRlciBvbiB3ZSBmb3JjZSBhdCBsZWFzdFxuICAgKiB0d28gY29kZXMgb2Ygbm9uIHplcm8gZnJlcXVlbmN5LlxuICAgKi9cbiAgd2hpbGUgKHMuaGVhcF9sZW4gPCAyKSB7XG4gICAgbm9kZSA9IHMuaGVhcFsrK3MuaGVhcF9sZW5dID0gKG1heF9jb2RlIDwgMiA/ICsrbWF4X2NvZGUgOiAwKTtcbiAgICB0cmVlW25vZGUgKiAyXS8qLkZyZXEqLyA9IDE7XG4gICAgcy5kZXB0aFtub2RlXSA9IDA7XG4gICAgcy5vcHRfbGVuLS07XG5cbiAgICBpZiAoaGFzX3N0cmVlKSB7XG4gICAgICBzLnN0YXRpY19sZW4gLT0gc3RyZWVbbm9kZSAqIDIgKyAxXS8qLkxlbiovO1xuICAgIH1cbiAgICAvKiBub2RlIGlzIDAgb3IgMSBzbyBpdCBkb2VzIG5vdCBoYXZlIGV4dHJhIGJpdHMgKi9cbiAgfVxuICBkZXNjLm1heF9jb2RlID0gbWF4X2NvZGU7XG5cbiAgLyogVGhlIGVsZW1lbnRzIGhlYXBbaGVhcF9sZW4vMisxIC4uIGhlYXBfbGVuXSBhcmUgbGVhdmVzIG9mIHRoZSB0cmVlLFxuICAgKiBlc3RhYmxpc2ggc3ViLWhlYXBzIG9mIGluY3JlYXNpbmcgbGVuZ3RoczpcbiAgICovXG4gIGZvciAobiA9IChzLmhlYXBfbGVuID4+IDEvKmludCAvMiovKTsgbiA+PSAxOyBuLS0pIHsgcHFkb3duaGVhcChzLCB0cmVlLCBuKTsgfVxuXG4gIC8qIENvbnN0cnVjdCB0aGUgSHVmZm1hbiB0cmVlIGJ5IHJlcGVhdGVkbHkgY29tYmluaW5nIHRoZSBsZWFzdCB0d29cbiAgICogZnJlcXVlbnQgbm9kZXMuXG4gICAqL1xuICBub2RlID0gZWxlbXM7ICAgICAgICAgICAgICAvKiBuZXh0IGludGVybmFsIG5vZGUgb2YgdGhlIHRyZWUgKi9cbiAgZG8ge1xuICAgIC8vcHFyZW1vdmUocywgdHJlZSwgbik7ICAvKiBuID0gbm9kZSBvZiBsZWFzdCBmcmVxdWVuY3kgKi9cbiAgICAvKioqIHBxcmVtb3ZlICoqKi9cbiAgICBuID0gcy5oZWFwWzEvKlNNQUxMRVNUKi9dO1xuICAgIHMuaGVhcFsxLypTTUFMTEVTVCovXSA9IHMuaGVhcFtzLmhlYXBfbGVuLS1dO1xuICAgIHBxZG93bmhlYXAocywgdHJlZSwgMS8qU01BTExFU1QqLyk7XG4gICAgLyoqKi9cblxuICAgIG0gPSBzLmhlYXBbMS8qU01BTExFU1QqL107IC8qIG0gPSBub2RlIG9mIG5leHQgbGVhc3QgZnJlcXVlbmN5ICovXG5cbiAgICBzLmhlYXBbLS1zLmhlYXBfbWF4XSA9IG47IC8qIGtlZXAgdGhlIG5vZGVzIHNvcnRlZCBieSBmcmVxdWVuY3kgKi9cbiAgICBzLmhlYXBbLS1zLmhlYXBfbWF4XSA9IG07XG5cbiAgICAvKiBDcmVhdGUgYSBuZXcgbm9kZSBmYXRoZXIgb2YgbiBhbmQgbSAqL1xuICAgIHRyZWVbbm9kZSAqIDJdLyouRnJlcSovID0gdHJlZVtuICogMl0vKi5GcmVxKi8gKyB0cmVlW20gKiAyXS8qLkZyZXEqLztcbiAgICBzLmRlcHRoW25vZGVdID0gKHMuZGVwdGhbbl0gPj0gcy5kZXB0aFttXSA/IHMuZGVwdGhbbl0gOiBzLmRlcHRoW21dKSArIDE7XG4gICAgdHJlZVtuICogMiArIDFdLyouRGFkKi8gPSB0cmVlW20gKiAyICsgMV0vKi5EYWQqLyA9IG5vZGU7XG5cbiAgICAvKiBhbmQgaW5zZXJ0IHRoZSBuZXcgbm9kZSBpbiB0aGUgaGVhcCAqL1xuICAgIHMuaGVhcFsxLypTTUFMTEVTVCovXSA9IG5vZGUrKztcbiAgICBwcWRvd25oZWFwKHMsIHRyZWUsIDEvKlNNQUxMRVNUKi8pO1xuXG4gIH0gd2hpbGUgKHMuaGVhcF9sZW4gPj0gMik7XG5cbiAgcy5oZWFwWy0tcy5oZWFwX21heF0gPSBzLmhlYXBbMS8qU01BTExFU1QqL107XG5cbiAgLyogQXQgdGhpcyBwb2ludCwgdGhlIGZpZWxkcyBmcmVxIGFuZCBkYWQgYXJlIHNldC4gV2UgY2FuIG5vd1xuICAgKiBnZW5lcmF0ZSB0aGUgYml0IGxlbmd0aHMuXG4gICAqL1xuICBnZW5fYml0bGVuKHMsIGRlc2MpO1xuXG4gIC8qIFRoZSBmaWVsZCBsZW4gaXMgbm93IHNldCwgd2UgY2FuIGdlbmVyYXRlIHRoZSBiaXQgY29kZXMgKi9cbiAgZ2VuX2NvZGVzKHRyZWUsIG1heF9jb2RlLCBzLmJsX2NvdW50KTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNjYW4gYSBsaXRlcmFsIG9yIGRpc3RhbmNlIHRyZWUgdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY2llcyBvZiB0aGUgY29kZXNcbiAqIGluIHRoZSBiaXQgbGVuZ3RoIHRyZWUuXG4gKi9cbmZ1bmN0aW9uIHNjYW5fdHJlZShzLCB0cmVlLCBtYXhfY29kZSlcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICBjdF9kYXRhICp0cmVlOyAgIC8qIHRoZSB0cmVlIHRvIGJlIHNjYW5uZWQgKi9cbi8vICAgIGludCBtYXhfY29kZTsgICAgLyogYW5kIGl0cyBsYXJnZXN0IGNvZGUgb2Ygbm9uIHplcm8gZnJlcXVlbmN5ICovXG57XG4gIHZhciBuOyAgICAgICAgICAgICAgICAgICAgIC8qIGl0ZXJhdGVzIG92ZXIgYWxsIHRyZWUgZWxlbWVudHMgKi9cbiAgdmFyIHByZXZsZW4gPSAtMTsgICAgICAgICAgLyogbGFzdCBlbWl0dGVkIGxlbmd0aCAqL1xuICB2YXIgY3VybGVuOyAgICAgICAgICAgICAgICAvKiBsZW5ndGggb2YgY3VycmVudCBjb2RlICovXG5cbiAgdmFyIG5leHRsZW4gPSB0cmVlWzAgKiAyICsgMV0vKi5MZW4qLzsgLyogbGVuZ3RoIG9mIG5leHQgY29kZSAqL1xuXG4gIHZhciBjb3VudCA9IDA7ICAgICAgICAgICAgIC8qIHJlcGVhdCBjb3VudCBvZiB0aGUgY3VycmVudCBjb2RlICovXG4gIHZhciBtYXhfY291bnQgPSA3OyAgICAgICAgIC8qIG1heCByZXBlYXQgY291bnQgKi9cbiAgdmFyIG1pbl9jb3VudCA9IDQ7ICAgICAgICAgLyogbWluIHJlcGVhdCBjb3VudCAqL1xuXG4gIGlmIChuZXh0bGVuID09PSAwKSB7XG4gICAgbWF4X2NvdW50ID0gMTM4O1xuICAgIG1pbl9jb3VudCA9IDM7XG4gIH1cbiAgdHJlZVsobWF4X2NvZGUgKyAxKSAqIDIgKyAxXS8qLkxlbiovID0gMHhmZmZmOyAvKiBndWFyZCAqL1xuXG4gIGZvciAobiA9IDA7IG4gPD0gbWF4X2NvZGU7IG4rKykge1xuICAgIGN1cmxlbiA9IG5leHRsZW47XG4gICAgbmV4dGxlbiA9IHRyZWVbKG4gKyAxKSAqIDIgKyAxXS8qLkxlbiovO1xuXG4gICAgaWYgKCsrY291bnQgPCBtYXhfY291bnQgJiYgY3VybGVuID09PSBuZXh0bGVuKSB7XG4gICAgICBjb250aW51ZTtcblxuICAgIH0gZWxzZSBpZiAoY291bnQgPCBtaW5fY291bnQpIHtcbiAgICAgIHMuYmxfdHJlZVtjdXJsZW4gKiAyXS8qLkZyZXEqLyArPSBjb3VudDtcblxuICAgIH0gZWxzZSBpZiAoY3VybGVuICE9PSAwKSB7XG5cbiAgICAgIGlmIChjdXJsZW4gIT09IHByZXZsZW4pIHsgcy5ibF90cmVlW2N1cmxlbiAqIDJdLyouRnJlcSovKys7IH1cbiAgICAgIHMuYmxfdHJlZVtSRVBfM182ICogMl0vKi5GcmVxKi8rKztcblxuICAgIH0gZWxzZSBpZiAoY291bnQgPD0gMTApIHtcbiAgICAgIHMuYmxfdHJlZVtSRVBaXzNfMTAgKiAyXS8qLkZyZXEqLysrO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHMuYmxfdHJlZVtSRVBaXzExXzEzOCAqIDJdLyouRnJlcSovKys7XG4gICAgfVxuXG4gICAgY291bnQgPSAwO1xuICAgIHByZXZsZW4gPSBjdXJsZW47XG5cbiAgICBpZiAobmV4dGxlbiA9PT0gMCkge1xuICAgICAgbWF4X2NvdW50ID0gMTM4O1xuICAgICAgbWluX2NvdW50ID0gMztcblxuICAgIH0gZWxzZSBpZiAoY3VybGVuID09PSBuZXh0bGVuKSB7XG4gICAgICBtYXhfY291bnQgPSA2O1xuICAgICAgbWluX2NvdW50ID0gMztcblxuICAgIH0gZWxzZSB7XG4gICAgICBtYXhfY291bnQgPSA3O1xuICAgICAgbWluX2NvdW50ID0gNDtcbiAgICB9XG4gIH1cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgYSBsaXRlcmFsIG9yIGRpc3RhbmNlIHRyZWUgaW4gY29tcHJlc3NlZCBmb3JtLCB1c2luZyB0aGUgY29kZXMgaW5cbiAqIGJsX3RyZWUuXG4gKi9cbmZ1bmN0aW9uIHNlbmRfdHJlZShzLCB0cmVlLCBtYXhfY29kZSlcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICBjdF9kYXRhICp0cmVlOyAvKiB0aGUgdHJlZSB0byBiZSBzY2FubmVkICovXG4vLyAgICBpbnQgbWF4X2NvZGU7ICAgICAgIC8qIGFuZCBpdHMgbGFyZ2VzdCBjb2RlIG9mIG5vbiB6ZXJvIGZyZXF1ZW5jeSAqL1xue1xuICB2YXIgbjsgICAgICAgICAgICAgICAgICAgICAvKiBpdGVyYXRlcyBvdmVyIGFsbCB0cmVlIGVsZW1lbnRzICovXG4gIHZhciBwcmV2bGVuID0gLTE7ICAgICAgICAgIC8qIGxhc3QgZW1pdHRlZCBsZW5ndGggKi9cbiAgdmFyIGN1cmxlbjsgICAgICAgICAgICAgICAgLyogbGVuZ3RoIG9mIGN1cnJlbnQgY29kZSAqL1xuXG4gIHZhciBuZXh0bGVuID0gdHJlZVswICogMiArIDFdLyouTGVuKi87IC8qIGxlbmd0aCBvZiBuZXh0IGNvZGUgKi9cblxuICB2YXIgY291bnQgPSAwOyAgICAgICAgICAgICAvKiByZXBlYXQgY291bnQgb2YgdGhlIGN1cnJlbnQgY29kZSAqL1xuICB2YXIgbWF4X2NvdW50ID0gNzsgICAgICAgICAvKiBtYXggcmVwZWF0IGNvdW50ICovXG4gIHZhciBtaW5fY291bnQgPSA0OyAgICAgICAgIC8qIG1pbiByZXBlYXQgY291bnQgKi9cblxuICAvKiB0cmVlW21heF9jb2RlKzFdLkxlbiA9IC0xOyAqLyAgLyogZ3VhcmQgYWxyZWFkeSBzZXQgKi9cbiAgaWYgKG5leHRsZW4gPT09IDApIHtcbiAgICBtYXhfY291bnQgPSAxMzg7XG4gICAgbWluX2NvdW50ID0gMztcbiAgfVxuXG4gIGZvciAobiA9IDA7IG4gPD0gbWF4X2NvZGU7IG4rKykge1xuICAgIGN1cmxlbiA9IG5leHRsZW47XG4gICAgbmV4dGxlbiA9IHRyZWVbKG4gKyAxKSAqIDIgKyAxXS8qLkxlbiovO1xuXG4gICAgaWYgKCsrY291bnQgPCBtYXhfY291bnQgJiYgY3VybGVuID09PSBuZXh0bGVuKSB7XG4gICAgICBjb250aW51ZTtcblxuICAgIH0gZWxzZSBpZiAoY291bnQgPCBtaW5fY291bnQpIHtcbiAgICAgIGRvIHsgc2VuZF9jb2RlKHMsIGN1cmxlbiwgcy5ibF90cmVlKTsgfSB3aGlsZSAoLS1jb3VudCAhPT0gMCk7XG5cbiAgICB9IGVsc2UgaWYgKGN1cmxlbiAhPT0gMCkge1xuICAgICAgaWYgKGN1cmxlbiAhPT0gcHJldmxlbikge1xuICAgICAgICBzZW5kX2NvZGUocywgY3VybGVuLCBzLmJsX3RyZWUpO1xuICAgICAgICBjb3VudC0tO1xuICAgICAgfVxuICAgICAgLy9Bc3NlcnQoY291bnQgPj0gMyAmJiBjb3VudCA8PSA2LCBcIiAzXzY/XCIpO1xuICAgICAgc2VuZF9jb2RlKHMsIFJFUF8zXzYsIHMuYmxfdHJlZSk7XG4gICAgICBzZW5kX2JpdHMocywgY291bnQgLSAzLCAyKTtcblxuICAgIH0gZWxzZSBpZiAoY291bnQgPD0gMTApIHtcbiAgICAgIHNlbmRfY29kZShzLCBSRVBaXzNfMTAsIHMuYmxfdHJlZSk7XG4gICAgICBzZW5kX2JpdHMocywgY291bnQgLSAzLCAzKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kX2NvZGUocywgUkVQWl8xMV8xMzgsIHMuYmxfdHJlZSk7XG4gICAgICBzZW5kX2JpdHMocywgY291bnQgLSAxMSwgNyk7XG4gICAgfVxuXG4gICAgY291bnQgPSAwO1xuICAgIHByZXZsZW4gPSBjdXJsZW47XG4gICAgaWYgKG5leHRsZW4gPT09IDApIHtcbiAgICAgIG1heF9jb3VudCA9IDEzODtcbiAgICAgIG1pbl9jb3VudCA9IDM7XG5cbiAgICB9IGVsc2UgaWYgKGN1cmxlbiA9PT0gbmV4dGxlbikge1xuICAgICAgbWF4X2NvdW50ID0gNjtcbiAgICAgIG1pbl9jb3VudCA9IDM7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgbWF4X2NvdW50ID0gNztcbiAgICAgIG1pbl9jb3VudCA9IDQ7XG4gICAgfVxuICB9XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb25zdHJ1Y3QgdGhlIEh1ZmZtYW4gdHJlZSBmb3IgdGhlIGJpdCBsZW5ndGhzIGFuZCByZXR1cm4gdGhlIGluZGV4IGluXG4gKiBibF9vcmRlciBvZiB0aGUgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gYnVpbGRfYmxfdHJlZShzKSB7XG4gIHZhciBtYXhfYmxpbmRleDsgIC8qIGluZGV4IG9mIGxhc3QgYml0IGxlbmd0aCBjb2RlIG9mIG5vbiB6ZXJvIGZyZXEgKi9cblxuICAvKiBEZXRlcm1pbmUgdGhlIGJpdCBsZW5ndGggZnJlcXVlbmNpZXMgZm9yIGxpdGVyYWwgYW5kIGRpc3RhbmNlIHRyZWVzICovXG4gIHNjYW5fdHJlZShzLCBzLmR5bl9sdHJlZSwgcy5sX2Rlc2MubWF4X2NvZGUpO1xuICBzY2FuX3RyZWUocywgcy5keW5fZHRyZWUsIHMuZF9kZXNjLm1heF9jb2RlKTtcblxuICAvKiBCdWlsZCB0aGUgYml0IGxlbmd0aCB0cmVlOiAqL1xuICBidWlsZF90cmVlKHMsIHMuYmxfZGVzYyk7XG4gIC8qIG9wdF9sZW4gbm93IGluY2x1ZGVzIHRoZSBsZW5ndGggb2YgdGhlIHRyZWUgcmVwcmVzZW50YXRpb25zLCBleGNlcHRcbiAgICogdGhlIGxlbmd0aHMgb2YgdGhlIGJpdCBsZW5ndGhzIGNvZGVzIGFuZCB0aGUgNSs1KzQgYml0cyBmb3IgdGhlIGNvdW50cy5cbiAgICovXG5cbiAgLyogRGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgYml0IGxlbmd0aCBjb2RlcyB0byBzZW5kLiBUaGUgcGt6aXAgZm9ybWF0XG4gICAqIHJlcXVpcmVzIHRoYXQgYXQgbGVhc3QgNCBiaXQgbGVuZ3RoIGNvZGVzIGJlIHNlbnQuIChhcHBub3RlLnR4dCBzYXlzXG4gICAqIDMgYnV0IHRoZSBhY3R1YWwgdmFsdWUgdXNlZCBpcyA0LilcbiAgICovXG4gIGZvciAobWF4X2JsaW5kZXggPSBCTF9DT0RFUyAtIDE7IG1heF9ibGluZGV4ID49IDM7IG1heF9ibGluZGV4LS0pIHtcbiAgICBpZiAocy5ibF90cmVlW2JsX29yZGVyW21heF9ibGluZGV4XSAqIDIgKyAxXS8qLkxlbiovICE9PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgLyogVXBkYXRlIG9wdF9sZW4gdG8gaW5jbHVkZSB0aGUgYml0IGxlbmd0aCB0cmVlIGFuZCBjb3VudHMgKi9cbiAgcy5vcHRfbGVuICs9IDMgKiAobWF4X2JsaW5kZXggKyAxKSArIDUgKyA1ICsgNDtcbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5keW4gdHJlZXM6IGR5biAlbGQsIHN0YXQgJWxkXCIsXG4gIC8vICAgICAgICBzLT5vcHRfbGVuLCBzLT5zdGF0aWNfbGVuKSk7XG5cbiAgcmV0dXJuIG1heF9ibGluZGV4O1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCB0aGUgaGVhZGVyIGZvciBhIGJsb2NrIHVzaW5nIGR5bmFtaWMgSHVmZm1hbiB0cmVlczogdGhlIGNvdW50cywgdGhlXG4gKiBsZW5ndGhzIG9mIHRoZSBiaXQgbGVuZ3RoIGNvZGVzLCB0aGUgbGl0ZXJhbCB0cmVlIGFuZCB0aGUgZGlzdGFuY2UgdHJlZS5cbiAqIElOIGFzc2VydGlvbjogbGNvZGVzID49IDI1NywgZGNvZGVzID49IDEsIGJsY29kZXMgPj0gNC5cbiAqL1xuZnVuY3Rpb24gc2VuZF9hbGxfdHJlZXMocywgbGNvZGVzLCBkY29kZXMsIGJsY29kZXMpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgaW50IGxjb2RlcywgZGNvZGVzLCBibGNvZGVzOyAvKiBudW1iZXIgb2YgY29kZXMgZm9yIGVhY2ggdHJlZSAqL1xue1xuICB2YXIgcmFuazsgICAgICAgICAgICAgICAgICAgIC8qIGluZGV4IGluIGJsX29yZGVyICovXG5cbiAgLy9Bc3NlcnQgKGxjb2RlcyA+PSAyNTcgJiYgZGNvZGVzID49IDEgJiYgYmxjb2RlcyA+PSA0LCBcIm5vdCBlbm91Z2ggY29kZXNcIik7XG4gIC8vQXNzZXJ0IChsY29kZXMgPD0gTF9DT0RFUyAmJiBkY29kZXMgPD0gRF9DT0RFUyAmJiBibGNvZGVzIDw9IEJMX0NPREVTLFxuICAvLyAgICAgICAgXCJ0b28gbWFueSBjb2Rlc1wiKTtcbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5ibCBjb3VudHM6IFwiKSk7XG4gIHNlbmRfYml0cyhzLCBsY29kZXMgLSAyNTcsIDUpOyAvKiBub3QgKzI1NSBhcyBzdGF0ZWQgaW4gYXBwbm90ZS50eHQgKi9cbiAgc2VuZF9iaXRzKHMsIGRjb2RlcyAtIDEsICAgNSk7XG4gIHNlbmRfYml0cyhzLCBibGNvZGVzIC0gNCwgIDQpOyAvKiBub3QgLTMgYXMgc3RhdGVkIGluIGFwcG5vdGUudHh0ICovXG4gIGZvciAocmFuayA9IDA7IHJhbmsgPCBibGNvZGVzOyByYW5rKyspIHtcbiAgICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmJsIGNvZGUgJTJkIFwiLCBibF9vcmRlcltyYW5rXSkpO1xuICAgIHNlbmRfYml0cyhzLCBzLmJsX3RyZWVbYmxfb3JkZXJbcmFua10gKiAyICsgMV0vKi5MZW4qLywgMyk7XG4gIH1cbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5ibCB0cmVlOiBzZW50ICVsZFwiLCBzLT5iaXRzX3NlbnQpKTtcblxuICBzZW5kX3RyZWUocywgcy5keW5fbHRyZWUsIGxjb2RlcyAtIDEpOyAvKiBsaXRlcmFsIHRyZWUgKi9cbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5saXQgdHJlZTogc2VudCAlbGRcIiwgcy0+Yml0c19zZW50KSk7XG5cbiAgc2VuZF90cmVlKHMsIHMuZHluX2R0cmVlLCBkY29kZXMgLSAxKTsgLyogZGlzdGFuY2UgdHJlZSAqL1xuICAvL1RyYWNldigoc3RkZXJyLCBcIlxcbmRpc3QgdHJlZTogc2VudCAlbGRcIiwgcy0+Yml0c19zZW50KSk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDaGVjayBpZiB0aGUgZGF0YSB0eXBlIGlzIFRFWFQgb3IgQklOQVJZLCB1c2luZyB0aGUgZm9sbG93aW5nIGFsZ29yaXRobTpcbiAqIC0gVEVYVCBpZiB0aGUgdHdvIGNvbmRpdGlvbnMgYmVsb3cgYXJlIHNhdGlzZmllZDpcbiAqICAgIGEpIFRoZXJlIGFyZSBubyBub24tcG9ydGFibGUgY29udHJvbCBjaGFyYWN0ZXJzIGJlbG9uZ2luZyB0byB0aGVcbiAqICAgICAgIFwiYmxhY2sgbGlzdFwiICgwLi42LCAxNC4uMjUsIDI4Li4zMSkuXG4gKiAgICBiKSBUaGVyZSBpcyBhdCBsZWFzdCBvbmUgcHJpbnRhYmxlIGNoYXJhY3RlciBiZWxvbmdpbmcgdG8gdGhlXG4gKiAgICAgICBcIndoaXRlIGxpc3RcIiAoOSB7VEFCfSwgMTAge0xGfSwgMTMge0NSfSwgMzIuLjI1NSkuXG4gKiAtIEJJTkFSWSBvdGhlcndpc2UuXG4gKiAtIFRoZSBmb2xsb3dpbmcgcGFydGlhbGx5LXBvcnRhYmxlIGNvbnRyb2wgY2hhcmFjdGVycyBmb3JtIGFcbiAqICAgXCJncmF5IGxpc3RcIiB0aGF0IGlzIGlnbm9yZWQgaW4gdGhpcyBkZXRlY3Rpb24gYWxnb3JpdGhtOlxuICogICAoNyB7QkVMfSwgOCB7QlN9LCAxMSB7VlR9LCAxMiB7RkZ9LCAyNiB7U1VCfSwgMjcge0VTQ30pLlxuICogSU4gYXNzZXJ0aW9uOiB0aGUgZmllbGRzIEZyZXEgb2YgZHluX2x0cmVlIGFyZSBzZXQuXG4gKi9cbmZ1bmN0aW9uIGRldGVjdF9kYXRhX3R5cGUocykge1xuICAvKiBibGFja19tYXNrIGlzIHRoZSBiaXQgbWFzayBvZiBibGFjay1saXN0ZWQgYnl0ZXNcbiAgICogc2V0IGJpdHMgMC4uNiwgMTQuLjI1LCBhbmQgMjguLjMxXG4gICAqIDB4ZjNmZmMwN2YgPSBiaW5hcnkgMTExMTAwMTExMTExMTExMTExMDAwMDAwMDExMTExMTFcbiAgICovXG4gIHZhciBibGFja19tYXNrID0gMHhmM2ZmYzA3ZjtcbiAgdmFyIG47XG5cbiAgLyogQ2hlY2sgZm9yIG5vbi10ZXh0dWFsIChcImJsYWNrLWxpc3RlZFwiKSBieXRlcy4gKi9cbiAgZm9yIChuID0gMDsgbiA8PSAzMTsgbisrLCBibGFja19tYXNrID4+Pj0gMSkge1xuICAgIGlmICgoYmxhY2tfbWFzayAmIDEpICYmIChzLmR5bl9sdHJlZVtuICogMl0vKi5GcmVxKi8gIT09IDApKSB7XG4gICAgICByZXR1cm4gWl9CSU5BUlk7XG4gICAgfVxuICB9XG5cbiAgLyogQ2hlY2sgZm9yIHRleHR1YWwgKFwid2hpdGUtbGlzdGVkXCIpIGJ5dGVzLiAqL1xuICBpZiAocy5keW5fbHRyZWVbOSAqIDJdLyouRnJlcSovICE9PSAwIHx8IHMuZHluX2x0cmVlWzEwICogMl0vKi5GcmVxKi8gIT09IDAgfHxcbiAgICAgIHMuZHluX2x0cmVlWzEzICogMl0vKi5GcmVxKi8gIT09IDApIHtcbiAgICByZXR1cm4gWl9URVhUO1xuICB9XG4gIGZvciAobiA9IDMyOyBuIDwgTElURVJBTFM7IG4rKykge1xuICAgIGlmIChzLmR5bl9sdHJlZVtuICogMl0vKi5GcmVxKi8gIT09IDApIHtcbiAgICAgIHJldHVybiBaX1RFWFQ7XG4gICAgfVxuICB9XG5cbiAgLyogVGhlcmUgYXJlIG5vIFwiYmxhY2stbGlzdGVkXCIgb3IgXCJ3aGl0ZS1saXN0ZWRcIiBieXRlczpcbiAgICogdGhpcyBzdHJlYW0gZWl0aGVyIGlzIGVtcHR5IG9yIGhhcyB0b2xlcmF0ZWQgKFwiZ3JheS1saXN0ZWRcIikgYnl0ZXMgb25seS5cbiAgICovXG4gIHJldHVybiBaX0JJTkFSWTtcbn1cblxuXG52YXIgc3RhdGljX2luaXRfZG9uZSA9IGZhbHNlO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEluaXRpYWxpemUgdGhlIHRyZWUgZGF0YSBzdHJ1Y3R1cmVzIGZvciBhIG5ldyB6bGliIHN0cmVhbS5cbiAqL1xuZnVuY3Rpb24gX3RyX2luaXQocylcbntcblxuICBpZiAoIXN0YXRpY19pbml0X2RvbmUpIHtcbiAgICB0cl9zdGF0aWNfaW5pdCgpO1xuICAgIHN0YXRpY19pbml0X2RvbmUgPSB0cnVlO1xuICB9XG5cbiAgcy5sX2Rlc2MgID0gbmV3IFRyZWVEZXNjKHMuZHluX2x0cmVlLCBzdGF0aWNfbF9kZXNjKTtcbiAgcy5kX2Rlc2MgID0gbmV3IFRyZWVEZXNjKHMuZHluX2R0cmVlLCBzdGF0aWNfZF9kZXNjKTtcbiAgcy5ibF9kZXNjID0gbmV3IFRyZWVEZXNjKHMuYmxfdHJlZSwgc3RhdGljX2JsX2Rlc2MpO1xuXG4gIHMuYmlfYnVmID0gMDtcbiAgcy5iaV92YWxpZCA9IDA7XG5cbiAgLyogSW5pdGlhbGl6ZSB0aGUgZmlyc3QgYmxvY2sgb2YgdGhlIGZpcnN0IGZpbGU6ICovXG4gIGluaXRfYmxvY2socyk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIGEgc3RvcmVkIGJsb2NrXG4gKi9cbmZ1bmN0aW9uIF90cl9zdG9yZWRfYmxvY2socywgYnVmLCBzdG9yZWRfbGVuLCBsYXN0KVxuLy9EZWZsYXRlU3RhdGUgKnM7XG4vL2NoYXJmICpidWY7ICAgICAgIC8qIGlucHV0IGJsb2NrICovXG4vL3VsZyBzdG9yZWRfbGVuOyAgIC8qIGxlbmd0aCBvZiBpbnB1dCBibG9jayAqL1xuLy9pbnQgbGFzdDsgICAgICAgICAvKiBvbmUgaWYgdGhpcyBpcyB0aGUgbGFzdCBibG9jayBmb3IgYSBmaWxlICovXG57XG4gIHNlbmRfYml0cyhzLCAoU1RPUkVEX0JMT0NLIDw8IDEpICsgKGxhc3QgPyAxIDogMCksIDMpOyAgICAvKiBzZW5kIGJsb2NrIHR5cGUgKi9cbiAgY29weV9ibG9jayhzLCBidWYsIHN0b3JlZF9sZW4sIHRydWUpOyAvKiB3aXRoIGhlYWRlciAqL1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCBvbmUgZW1wdHkgc3RhdGljIGJsb2NrIHRvIGdpdmUgZW5vdWdoIGxvb2thaGVhZCBmb3IgaW5mbGF0ZS5cbiAqIFRoaXMgdGFrZXMgMTAgYml0cywgb2Ygd2hpY2ggNyBtYXkgcmVtYWluIGluIHRoZSBiaXQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBfdHJfYWxpZ24ocykge1xuICBzZW5kX2JpdHMocywgU1RBVElDX1RSRUVTIDw8IDEsIDMpO1xuICBzZW5kX2NvZGUocywgRU5EX0JMT0NLLCBzdGF0aWNfbHRyZWUpO1xuICBiaV9mbHVzaChzKTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIERldGVybWluZSB0aGUgYmVzdCBlbmNvZGluZyBmb3IgdGhlIGN1cnJlbnQgYmxvY2s6IGR5bmFtaWMgdHJlZXMsIHN0YXRpY1xuICogdHJlZXMgb3Igc3RvcmUsIGFuZCBvdXRwdXQgdGhlIGVuY29kZWQgYmxvY2sgdG8gdGhlIHppcCBmaWxlLlxuICovXG5mdW5jdGlvbiBfdHJfZmx1c2hfYmxvY2socywgYnVmLCBzdG9yZWRfbGVuLCBsYXN0KVxuLy9EZWZsYXRlU3RhdGUgKnM7XG4vL2NoYXJmICpidWY7ICAgICAgIC8qIGlucHV0IGJsb2NrLCBvciBOVUxMIGlmIHRvbyBvbGQgKi9cbi8vdWxnIHN0b3JlZF9sZW47ICAgLyogbGVuZ3RoIG9mIGlucHV0IGJsb2NrICovXG4vL2ludCBsYXN0OyAgICAgICAgIC8qIG9uZSBpZiB0aGlzIGlzIHRoZSBsYXN0IGJsb2NrIGZvciBhIGZpbGUgKi9cbntcbiAgdmFyIG9wdF9sZW5iLCBzdGF0aWNfbGVuYjsgIC8qIG9wdF9sZW4gYW5kIHN0YXRpY19sZW4gaW4gYnl0ZXMgKi9cbiAgdmFyIG1heF9ibGluZGV4ID0gMDsgICAgICAgIC8qIGluZGV4IG9mIGxhc3QgYml0IGxlbmd0aCBjb2RlIG9mIG5vbiB6ZXJvIGZyZXEgKi9cblxuICAvKiBCdWlsZCB0aGUgSHVmZm1hbiB0cmVlcyB1bmxlc3MgYSBzdG9yZWQgYmxvY2sgaXMgZm9yY2VkICovXG4gIGlmIChzLmxldmVsID4gMCkge1xuXG4gICAgLyogQ2hlY2sgaWYgdGhlIGZpbGUgaXMgYmluYXJ5IG9yIHRleHQgKi9cbiAgICBpZiAocy5zdHJtLmRhdGFfdHlwZSA9PT0gWl9VTktOT1dOKSB7XG4gICAgICBzLnN0cm0uZGF0YV90eXBlID0gZGV0ZWN0X2RhdGFfdHlwZShzKTtcbiAgICB9XG5cbiAgICAvKiBDb25zdHJ1Y3QgdGhlIGxpdGVyYWwgYW5kIGRpc3RhbmNlIHRyZWVzICovXG4gICAgYnVpbGRfdHJlZShzLCBzLmxfZGVzYyk7XG4gICAgLy8gVHJhY2V2KChzdGRlcnIsIFwiXFxubGl0IGRhdGE6IGR5biAlbGQsIHN0YXQgJWxkXCIsIHMtPm9wdF9sZW4sXG4gICAgLy8gICAgICAgIHMtPnN0YXRpY19sZW4pKTtcblxuICAgIGJ1aWxkX3RyZWUocywgcy5kX2Rlc2MpO1xuICAgIC8vIFRyYWNldigoc3RkZXJyLCBcIlxcbmRpc3QgZGF0YTogZHluICVsZCwgc3RhdCAlbGRcIiwgcy0+b3B0X2xlbixcbiAgICAvLyAgICAgICAgcy0+c3RhdGljX2xlbikpO1xuICAgIC8qIEF0IHRoaXMgcG9pbnQsIG9wdF9sZW4gYW5kIHN0YXRpY19sZW4gYXJlIHRoZSB0b3RhbCBiaXQgbGVuZ3RocyBvZlxuICAgICAqIHRoZSBjb21wcmVzc2VkIGJsb2NrIGRhdGEsIGV4Y2x1ZGluZyB0aGUgdHJlZSByZXByZXNlbnRhdGlvbnMuXG4gICAgICovXG5cbiAgICAvKiBCdWlsZCB0aGUgYml0IGxlbmd0aCB0cmVlIGZvciB0aGUgYWJvdmUgdHdvIHRyZWVzLCBhbmQgZ2V0IHRoZSBpbmRleFxuICAgICAqIGluIGJsX29yZGVyIG9mIHRoZSBsYXN0IGJpdCBsZW5ndGggY29kZSB0byBzZW5kLlxuICAgICAqL1xuICAgIG1heF9ibGluZGV4ID0gYnVpbGRfYmxfdHJlZShzKTtcblxuICAgIC8qIERldGVybWluZSB0aGUgYmVzdCBlbmNvZGluZy4gQ29tcHV0ZSB0aGUgYmxvY2sgbGVuZ3RocyBpbiBieXRlcy4gKi9cbiAgICBvcHRfbGVuYiA9IChzLm9wdF9sZW4gKyAzICsgNykgPj4+IDM7XG4gICAgc3RhdGljX2xlbmIgPSAocy5zdGF0aWNfbGVuICsgMyArIDcpID4+PiAzO1xuXG4gICAgLy8gVHJhY2V2KChzdGRlcnIsIFwiXFxub3B0ICVsdSglbHUpIHN0YXQgJWx1KCVsdSkgc3RvcmVkICVsdSBsaXQgJXUgXCIsXG4gICAgLy8gICAgICAgIG9wdF9sZW5iLCBzLT5vcHRfbGVuLCBzdGF0aWNfbGVuYiwgcy0+c3RhdGljX2xlbiwgc3RvcmVkX2xlbixcbiAgICAvLyAgICAgICAgcy0+bGFzdF9saXQpKTtcblxuICAgIGlmIChzdGF0aWNfbGVuYiA8PSBvcHRfbGVuYikgeyBvcHRfbGVuYiA9IHN0YXRpY19sZW5iOyB9XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBBc3NlcnQoYnVmICE9IChjaGFyKikwLCBcImxvc3QgYnVmXCIpO1xuICAgIG9wdF9sZW5iID0gc3RhdGljX2xlbmIgPSBzdG9yZWRfbGVuICsgNTsgLyogZm9yY2UgYSBzdG9yZWQgYmxvY2sgKi9cbiAgfVxuXG4gIGlmICgoc3RvcmVkX2xlbiArIDQgPD0gb3B0X2xlbmIpICYmIChidWYgIT09IC0xKSkge1xuICAgIC8qIDQ6IHR3byB3b3JkcyBmb3IgdGhlIGxlbmd0aHMgKi9cblxuICAgIC8qIFRoZSB0ZXN0IGJ1ZiAhPSBOVUxMIGlzIG9ubHkgbmVjZXNzYXJ5IGlmIExJVF9CVUZTSVpFID4gV1NJWkUuXG4gICAgICogT3RoZXJ3aXNlIHdlIGNhbid0IGhhdmUgcHJvY2Vzc2VkIG1vcmUgdGhhbiBXU0laRSBpbnB1dCBieXRlcyBzaW5jZVxuICAgICAqIHRoZSBsYXN0IGJsb2NrIGZsdXNoLCBiZWNhdXNlIGNvbXByZXNzaW9uIHdvdWxkIGhhdmUgYmVlblxuICAgICAqIHN1Y2Nlc3NmdWwuIElmIExJVF9CVUZTSVpFIDw9IFdTSVpFLCBpdCBpcyBuZXZlciB0b28gbGF0ZSB0b1xuICAgICAqIHRyYW5zZm9ybSBhIGJsb2NrIGludG8gYSBzdG9yZWQgYmxvY2suXG4gICAgICovXG4gICAgX3RyX3N0b3JlZF9ibG9jayhzLCBidWYsIHN0b3JlZF9sZW4sIGxhc3QpO1xuXG4gIH0gZWxzZSBpZiAocy5zdHJhdGVneSA9PT0gWl9GSVhFRCB8fCBzdGF0aWNfbGVuYiA9PT0gb3B0X2xlbmIpIHtcblxuICAgIHNlbmRfYml0cyhzLCAoU1RBVElDX1RSRUVTIDw8IDEpICsgKGxhc3QgPyAxIDogMCksIDMpO1xuICAgIGNvbXByZXNzX2Jsb2NrKHMsIHN0YXRpY19sdHJlZSwgc3RhdGljX2R0cmVlKTtcblxuICB9IGVsc2Uge1xuICAgIHNlbmRfYml0cyhzLCAoRFlOX1RSRUVTIDw8IDEpICsgKGxhc3QgPyAxIDogMCksIDMpO1xuICAgIHNlbmRfYWxsX3RyZWVzKHMsIHMubF9kZXNjLm1heF9jb2RlICsgMSwgcy5kX2Rlc2MubWF4X2NvZGUgKyAxLCBtYXhfYmxpbmRleCArIDEpO1xuICAgIGNvbXByZXNzX2Jsb2NrKHMsIHMuZHluX2x0cmVlLCBzLmR5bl9kdHJlZSk7XG4gIH1cbiAgLy8gQXNzZXJ0IChzLT5jb21wcmVzc2VkX2xlbiA9PSBzLT5iaXRzX3NlbnQsIFwiYmFkIGNvbXByZXNzZWQgc2l6ZVwiKTtcbiAgLyogVGhlIGFib3ZlIGNoZWNrIGlzIG1hZGUgbW9kIDJeMzIsIGZvciBmaWxlcyBsYXJnZXIgdGhhbiA1MTIgTUJcbiAgICogYW5kIHVMb25nIGltcGxlbWVudGVkIG9uIDMyIGJpdHMuXG4gICAqL1xuICBpbml0X2Jsb2NrKHMpO1xuXG4gIGlmIChsYXN0KSB7XG4gICAgYmlfd2luZHVwKHMpO1xuICB9XG4gIC8vIFRyYWNldigoc3RkZXJyLFwiXFxuY29tcHJsZW4gJWx1KCVsdSkgXCIsIHMtPmNvbXByZXNzZWRfbGVuPj4zLFxuICAvLyAgICAgICBzLT5jb21wcmVzc2VkX2xlbi03Kmxhc3QpKTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTYXZlIHRoZSBtYXRjaCBpbmZvIGFuZCB0YWxseSB0aGUgZnJlcXVlbmN5IGNvdW50cy4gUmV0dXJuIHRydWUgaWZcbiAqIHRoZSBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZC5cbiAqL1xuZnVuY3Rpb24gX3RyX3RhbGx5KHMsIGRpc3QsIGxjKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIHVuc2lnbmVkIGRpc3Q7ICAvKiBkaXN0YW5jZSBvZiBtYXRjaGVkIHN0cmluZyAqL1xuLy8gICAgdW5zaWduZWQgbGM7ICAgIC8qIG1hdGNoIGxlbmd0aC1NSU5fTUFUQ0ggb3IgdW5tYXRjaGVkIGNoYXIgKGlmIGRpc3Q9PTApICovXG57XG4gIC8vdmFyIG91dF9sZW5ndGgsIGluX2xlbmd0aCwgZGNvZGU7XG5cbiAgcy5wZW5kaW5nX2J1ZltzLmRfYnVmICsgcy5sYXN0X2xpdCAqIDJdICAgICA9IChkaXN0ID4+PiA4KSAmIDB4ZmY7XG4gIHMucGVuZGluZ19idWZbcy5kX2J1ZiArIHMubGFzdF9saXQgKiAyICsgMV0gPSBkaXN0ICYgMHhmZjtcblxuICBzLnBlbmRpbmdfYnVmW3MubF9idWYgKyBzLmxhc3RfbGl0XSA9IGxjICYgMHhmZjtcbiAgcy5sYXN0X2xpdCsrO1xuXG4gIGlmIChkaXN0ID09PSAwKSB7XG4gICAgLyogbGMgaXMgdGhlIHVubWF0Y2hlZCBjaGFyICovXG4gICAgcy5keW5fbHRyZWVbbGMgKiAyXS8qLkZyZXEqLysrO1xuICB9IGVsc2Uge1xuICAgIHMubWF0Y2hlcysrO1xuICAgIC8qIEhlcmUsIGxjIGlzIHRoZSBtYXRjaCBsZW5ndGggLSBNSU5fTUFUQ0ggKi9cbiAgICBkaXN0LS07ICAgICAgICAgICAgIC8qIGRpc3QgPSBtYXRjaCBkaXN0YW5jZSAtIDEgKi9cbiAgICAvL0Fzc2VydCgodXNoKWRpc3QgPCAodXNoKU1BWF9ESVNUKHMpICYmXG4gICAgLy8gICAgICAgKHVzaClsYyA8PSAodXNoKShNQVhfTUFUQ0gtTUlOX01BVENIKSAmJlxuICAgIC8vICAgICAgICh1c2gpZF9jb2RlKGRpc3QpIDwgKHVzaClEX0NPREVTLCAgXCJfdHJfdGFsbHk6IGJhZCBtYXRjaFwiKTtcblxuICAgIHMuZHluX2x0cmVlWyhfbGVuZ3RoX2NvZGVbbGNdICsgTElURVJBTFMgKyAxKSAqIDJdLyouRnJlcSovKys7XG4gICAgcy5keW5fZHRyZWVbZF9jb2RlKGRpc3QpICogMl0vKi5GcmVxKi8rKztcbiAgfVxuXG4vLyAoISkgVGhpcyBibG9jayBpcyBkaXNhYmxlZCBpbiB6bGliIGRlZmF1bHRzLFxuLy8gZG9uJ3QgZW5hYmxlIGl0IGZvciBiaW5hcnkgY29tcGF0aWJpbGl0eVxuXG4vLyNpZmRlZiBUUlVOQ0FURV9CTE9DS1xuLy8gIC8qIFRyeSB0byBndWVzcyBpZiBpdCBpcyBwcm9maXRhYmxlIHRvIHN0b3AgdGhlIGN1cnJlbnQgYmxvY2sgaGVyZSAqL1xuLy8gIGlmICgocy5sYXN0X2xpdCAmIDB4MWZmZikgPT09IDAgJiYgcy5sZXZlbCA+IDIpIHtcbi8vICAgIC8qIENvbXB1dGUgYW4gdXBwZXIgYm91bmQgZm9yIHRoZSBjb21wcmVzc2VkIGxlbmd0aCAqL1xuLy8gICAgb3V0X2xlbmd0aCA9IHMubGFzdF9saXQqODtcbi8vICAgIGluX2xlbmd0aCA9IHMuc3Ryc3RhcnQgLSBzLmJsb2NrX3N0YXJ0O1xuLy9cbi8vICAgIGZvciAoZGNvZGUgPSAwOyBkY29kZSA8IERfQ09ERVM7IGRjb2RlKyspIHtcbi8vICAgICAgb3V0X2xlbmd0aCArPSBzLmR5bl9kdHJlZVtkY29kZSoyXS8qLkZyZXEqLyAqICg1ICsgZXh0cmFfZGJpdHNbZGNvZGVdKTtcbi8vICAgIH1cbi8vICAgIG91dF9sZW5ndGggPj4+PSAzO1xuLy8gICAgLy9UcmFjZXYoKHN0ZGVycixcIlxcbmxhc3RfbGl0ICV1LCBpbiAlbGQsIG91dCB+JWxkKCVsZCUlKSBcIixcbi8vICAgIC8vICAgICAgIHMtPmxhc3RfbGl0LCBpbl9sZW5ndGgsIG91dF9sZW5ndGgsXG4vLyAgICAvLyAgICAgICAxMDBMIC0gb3V0X2xlbmd0aCoxMDBML2luX2xlbmd0aCkpO1xuLy8gICAgaWYgKHMubWF0Y2hlcyA8IChzLmxhc3RfbGl0Pj4xKS8qaW50IC8yKi8gJiYgb3V0X2xlbmd0aCA8IChpbl9sZW5ndGg+PjEpLyppbnQgLzIqLykge1xuLy8gICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgIH1cbi8vICB9XG4vLyNlbmRpZlxuXG4gIHJldHVybiAocy5sYXN0X2xpdCA9PT0gcy5saXRfYnVmc2l6ZSAtIDEpO1xuICAvKiBXZSBhdm9pZCBlcXVhbGl0eSB3aXRoIGxpdF9idWZzaXplIGJlY2F1c2Ugb2Ygd3JhcGFyb3VuZCBhdCA2NEtcbiAgICogb24gMTYgYml0IG1hY2hpbmVzIGFuZCBiZWNhdXNlIHN0b3JlZCBibG9ja3MgYXJlIHJlc3RyaWN0ZWQgdG9cbiAgICogNjRLLTEgYnl0ZXMuXG4gICAqL1xufVxuXG5leHBvcnRzLl90cl9pbml0ICA9IF90cl9pbml0O1xuZXhwb3J0cy5fdHJfc3RvcmVkX2Jsb2NrID0gX3RyX3N0b3JlZF9ibG9jaztcbmV4cG9ydHMuX3RyX2ZsdXNoX2Jsb2NrICA9IF90cl9mbHVzaF9ibG9jaztcbmV4cG9ydHMuX3RyX3RhbGx5ID0gX3RyX3RhbGx5O1xuZXhwb3J0cy5fdHJfYWxpZ24gPSBfdHJfYWxpZ247XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuZnVuY3Rpb24gWlN0cmVhbSgpIHtcbiAgLyogbmV4dCBpbnB1dCBieXRlICovXG4gIHRoaXMuaW5wdXQgPSBudWxsOyAvLyBKUyBzcGVjaWZpYywgYmVjYXVzZSB3ZSBoYXZlIG5vIHBvaW50ZXJzXG4gIHRoaXMubmV4dF9pbiA9IDA7XG4gIC8qIG51bWJlciBvZiBieXRlcyBhdmFpbGFibGUgYXQgaW5wdXQgKi9cbiAgdGhpcy5hdmFpbF9pbiA9IDA7XG4gIC8qIHRvdGFsIG51bWJlciBvZiBpbnB1dCBieXRlcyByZWFkIHNvIGZhciAqL1xuICB0aGlzLnRvdGFsX2luID0gMDtcbiAgLyogbmV4dCBvdXRwdXQgYnl0ZSBzaG91bGQgYmUgcHV0IHRoZXJlICovXG4gIHRoaXMub3V0cHV0ID0gbnVsbDsgLy8gSlMgc3BlY2lmaWMsIGJlY2F1c2Ugd2UgaGF2ZSBubyBwb2ludGVyc1xuICB0aGlzLm5leHRfb3V0ID0gMDtcbiAgLyogcmVtYWluaW5nIGZyZWUgc3BhY2UgYXQgb3V0cHV0ICovXG4gIHRoaXMuYXZhaWxfb3V0ID0gMDtcbiAgLyogdG90YWwgbnVtYmVyIG9mIGJ5dGVzIG91dHB1dCBzbyBmYXIgKi9cbiAgdGhpcy50b3RhbF9vdXQgPSAwO1xuICAvKiBsYXN0IGVycm9yIG1lc3NhZ2UsIE5VTEwgaWYgbm8gZXJyb3IgKi9cbiAgdGhpcy5tc2cgPSAnJy8qWl9OVUxMKi87XG4gIC8qIG5vdCB2aXNpYmxlIGJ5IGFwcGxpY2F0aW9ucyAqL1xuICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgLyogYmVzdCBndWVzcyBhYm91dCB0aGUgZGF0YSB0eXBlOiBiaW5hcnkgb3IgdGV4dCAqL1xuICB0aGlzLmRhdGFfdHlwZSA9IDIvKlpfVU5LTk9XTiovO1xuICAvKiBhZGxlcjMyIHZhbHVlIG9mIHRoZSB1bmNvbXByZXNzZWQgZGF0YSAqL1xuICB0aGlzLmFkbGVyID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBaU3RyZWFtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfdGhpcyA9IHRoaXM7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5maW5kID0gZnVuY3Rpb24gKHJlc3VsdCwgZG9jdW1lbnQpIHtcclxuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZXN1bHQucyk7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGVsZW1lbnQgd2l0aCBzZWxlY3RvcjogJyArIHJlc3VsdC5zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbGVtZW50LmNoaWxkTm9kZXNbcmVzdWx0LmNdO1xyXG59O1xyXG5leHBvcnRzLmdlbmVyYXRlU2VsZWN0b3IgPSBmdW5jdGlvbiAobm9kZSwgcmVsYXRpdmVUbykge1xyXG4gICAgdmFyIGN1cnJlbnROb2RlID0gbm9kZTtcclxuICAgIHZhciB0YWdOYW1lcyA9IFtdO1xyXG4gICAgdmFyIHRleHROb2RlSW5kZXggPSAwO1xyXG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHRleHROb2RlSW5kZXggPSBfdGhpcy5jaGlsZE5vZGVJbmRleE9mKG5vZGUucGFyZW50Tm9kZSwgbm9kZSk7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gY3VycmVudE5vZGUudGFnTmFtZTtcclxuICAgICAgICAgICAgaWYgKHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBudGhJbmRleCA9IF90aGlzLmNvbXB1dGVkTnRoSW5kZXgoY3VycmVudE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gdGFnTmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChudGhJbmRleCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciArPSBcIjpudGgtb2YtdHlwZShcIiArIG50aEluZGV4ICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0YWdOYW1lcy5wdXNoKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IChjdXJyZW50Tm9kZS5wYXJlbnROb2RlIHx8IGN1cnJlbnROb2RlLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT0gKHJlbGF0aXZlVG8ucGFyZW50Tm9kZSB8fCByZWxhdGl2ZVRvLnBhcmVudEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7IHM6IHRhZ05hbWVzLnJldmVyc2UoKS5qb2luKFwiPlwiKS50b0xvd2VyQ2FzZSgpLCBjOiB0ZXh0Tm9kZUluZGV4LCBvOiAwIH07XHJcbn07XHJcbmV4cG9ydHMuY2hpbGROb2RlSW5kZXhPZiA9IGZ1bmN0aW9uIChwYXJlbnROb2RlLCBjaGlsZE5vZGUpIHtcclxuICAgIHZhciBjaGlsZE5vZGVzID0gcGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xyXG4gICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkTm9kZXNbaV0gPT09IGNoaWxkTm9kZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnRzLmNvbXB1dGVkTnRoSW5kZXggPSBmdW5jdGlvbiAoY2hpbGRFbGVtZW50KSB7XHJcbiAgICB2YXIgZWxlbWVudHNXaXRoU2FtZVRhZyA9IDA7XHJcbiAgICB2YXIgcGFyZW50ID0gKGNoaWxkRWxlbWVudC5wYXJlbnROb2RlIHx8IGNoaWxkRWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEh0bWxFbGVtZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SHRtbEVsZW1lbnQgPT09IGNoaWxkRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNXaXRoU2FtZVRhZysrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRIdG1sRWxlbWVudC50YWdOYW1lID09PSBjaGlsZEVsZW1lbnQudGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHNXaXRoU2FtZVRhZysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnRzV2l0aFNhbWVUYWc7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBQYWtvID0gcmVxdWlyZShcInBha29cIik7XHJcbmV4cG9ydHMuY29tcHJlc3MgPSBmdW5jdGlvbiAoZGVjb21wcmVzc2VkKSB7IHJldHVybiBQYWtvLmRlZmxhdGVSYXcoZGVjb21wcmVzc2VkLCB7IGxldmVsOiA5LCByYXc6IHRydWUgfSk7IH07XHJcbmV4cG9ydHMuZGVjb21wcmVzcyA9IGZ1bmN0aW9uIChjb21wcmVzc2VkKSB7IHJldHVybiBQYWtvLmluZmxhdGUoY29tcHJlc3NlZCwgeyByYXc6IHRydWUsIHRvOiBcInN0cmluZ1wiIH0pOyB9O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ0b2EoQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGJ1ZmZlciwgZnVuY3Rpb24gKGNoKSB7IHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoKTsgfSkuam9pbignJykpOyB9O1xyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChiYXNlNjQpIHtcclxuICAgIHZhciBiaW5zdHIgPSBhdG9iKGJhc2U2NCk7XHJcbiAgICB2YXIgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYmluc3RyLmxlbmd0aCk7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGJpbnN0ciwgZnVuY3Rpb24gKGNoLCBpbmRleCkgeyByZXR1cm4gYnVmZmVyW2luZGV4XSA9IGNoLmNoYXJDb2RlQXQoMCk7IH0pO1xyXG4gICAgcmV0dXJuIGJ1ZmZlcjtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEh0bWxFbGVtZW50U2VsZWN0b3JHZW5lcmF0b3JfMSA9IHJlcXVpcmUoXCIuL0h0bWxFbGVtZW50U2VsZWN0b3JHZW5lcmF0b3JcIik7XHJcbmV4cG9ydHMuc2VyaWFsaXplID0gZnVuY3Rpb24gKHJhbmdlLCByZWxhdGl2ZVRvKSB7XHJcbiAgICB2YXIgc3RhcnQgPSBIdG1sRWxlbWVudFNlbGVjdG9yR2VuZXJhdG9yXzEuZ2VuZXJhdGVTZWxlY3RvcihyYW5nZS5zdGFydENvbnRhaW5lciwgcmVsYXRpdmVUbyk7XHJcbiAgICBzdGFydC5vID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XHJcbiAgICB2YXIgZW5kID0gSHRtbEVsZW1lbnRTZWxlY3RvckdlbmVyYXRvcl8xLmdlbmVyYXRlU2VsZWN0b3IocmFuZ2UuZW5kQ29udGFpbmVyLCByZWxhdGl2ZVRvKTtcclxuICAgIGVuZC5vID0gcmFuZ2UuZW5kT2Zmc2V0O1xyXG4gICAgcmV0dXJuIHsgczogc3RhcnQsIGU6IGVuZCB9O1xyXG59O1xyXG5leHBvcnRzLmRlc2VyaWFsaXplID0gZnVuY3Rpb24gKHJlc3VsdCwgZG9jdW1lbnQpIHtcclxuICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICB2YXIgc3RhcnROb2RlID0gSHRtbEVsZW1lbnRTZWxlY3RvckdlbmVyYXRvcl8xLmZpbmQocmVzdWx0LnMsIGRvY3VtZW50KTtcclxuICAgIHZhciBlbmROb2RlID0gSHRtbEVsZW1lbnRTZWxlY3RvckdlbmVyYXRvcl8xLmZpbmQocmVzdWx0LmUsIGRvY3VtZW50KTtcclxuICAgIGlmIChzdGFydE5vZGUubm9kZVR5cGUgIT0gTm9kZS5URVhUX05PREUgJiYgc3RhcnROb2RlLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuZmlyc3RDaGlsZDtcclxuICAgIH1cclxuICAgIGlmIChlbmROb2RlLm5vZGVUeXBlICE9IE5vZGUuVEVYVF9OT0RFICYmIGVuZE5vZGUuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIGVuZE5vZGUgPSBlbmROb2RlLmZpcnN0Q2hpbGQ7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhcnROb2RlKSB7XHJcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc3RhcnROb2RlLCByZXN1bHQucy5vKTtcclxuICAgIH1cclxuICAgIGlmIChlbmROb2RlKSB7XHJcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKGVuZE5vZGUsIHJlc3VsdC5lLm8pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJhbmdlO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmFuZ2VTZXJpYWxpemVyXzEgPSByZXF1aXJlKFwiLi9SYW5nZVNlcmlhbGl6ZXJcIik7XHJcbnZhciBSYW5nZUNvbXByZXNzb3JfMSA9IHJlcXVpcmUoXCIuL1JhbmdlQ29tcHJlc3NvclwiKTtcclxudmFyIFJhbmdlRW5jb2Rlcl8xID0gcmVxdWlyZShcIi4vUmFuZ2VFbmNvZGVyXCIpO1xyXG52YXIgUmFuZ2VlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmFuZ2VlKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZ2V0RW5jb2RlZFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0aWFsUmFuZ2VzID0gX3RoaXMuY3JlYXRlUGFydGlhbFJhbmdlcyhyYW5nZSk7XHJcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkID0gcGFydGlhbFJhbmdlc1xyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAocmFuZ2UpIHsgcmV0dXJuIFJhbmdlU2VyaWFsaXplcl8xLnNlcmlhbGl6ZShyYW5nZS5jbG9uZVJhbmdlKCksIF90aGlzLm9wdGlvbnMuZG9jdW1lbnQuYm9keSk7IH0pXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChzZXJpYWxpemVkUmFuZ2UpIHsgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZWRSYW5nZSk7IH0pXHJcbiAgICAgICAgICAgICAgICAuam9pbihcInxcIik7XHJcbiAgICAgICAgICAgIHZhciBjb21wcmVzc2VkID0gUmFuZ2VDb21wcmVzc29yXzEuY29tcHJlc3Moc2VyaWFsaXplZCk7XHJcbiAgICAgICAgICAgIHZhciBlbmNvZGVkID0gUmFuZ2VFbmNvZGVyXzEuZW5jb2RlKGNvbXByZXNzZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0RGVjb2RlZFJhbmdlcyA9IGZ1bmN0aW9uIChyZXByZXNlbnRhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgZGVjb2RlZCA9IFJhbmdlRW5jb2Rlcl8xLmRlY29kZShyZXByZXNlbnRhdGlvbik7XHJcbiAgICAgICAgICAgIHZhciBkZWNvbXByZXNzZWQgPSBSYW5nZUNvbXByZXNzb3JfMS5kZWNvbXByZXNzKGRlY29kZWQpO1xyXG4gICAgICAgICAgICB2YXIgc2VyaWFsaXplZFJhbmdlcyA9IGRlY29tcHJlc3NlZFxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwifFwiKVxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZGVjb21wcmVzc2VkUmFuZ2VSZXByZXNlbnRhdGlvbikgeyByZXR1cm4gSlNPTi5wYXJzZShkZWNvbXByZXNzZWRSYW5nZVJlcHJlc2VudGF0aW9uKTsgfSlcclxuICAgICAgICAgICAgICAgIC5yZXZlcnNlKClcclxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHNlcmlhbGl6ZWRSYW5nZSkgeyByZXR1cm4gUmFuZ2VTZXJpYWxpemVyXzEuZGVzZXJpYWxpemUoc2VyaWFsaXplZFJhbmdlLCBfdGhpcy5vcHRpb25zLmRvY3VtZW50KTsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVkUmFuZ2VzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWFsUmFuZ2VzID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcbiAgICAgICAgICAgIC8vIHRleHRcclxuICAgICAgICAgICAgaWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyID09PSByYW5nZS5lbmRDb250YWluZXJcclxuICAgICAgICAgICAgICAgICYmIHJhbmdlLnN0YXJ0Q29udGFpbmVyLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxyXG4gICAgICAgICAgICAgICAgJiYgcmFuZ2UuZW5kQ29udGFpbmVyLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtyYW5nZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRvY3VtZW50QXNBbnkgPSBfdGhpcy5vcHRpb25zLmRvY3VtZW50OyAvLyBJRSBkb2VzIG5vdCBrbm93IHRoZSByaWdodCBzcGVjIHNpZ25hdHVyZSBmb3IgY3JlYXRlVHJlZVdhbGtlclxyXG4gICAgICAgICAgICAvLyBlbGVtZW50c1xyXG4gICAgICAgICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50QXNBbnkuY3JlYXRlVHJlZVdhbGtlcihyYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lciwgTm9kZUZpbHRlci5TSE9XX0FMTCwgZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVDsgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZW5kRm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgbm9kZTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlID09PSByYW5nZS5zdGFydENvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Rm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIHN0YXJ0Rm91bmQgJiYgIWVuZEZvdW5kICYmIG5vZGUudGV4dENvbnRlbnQgJiYgbm9kZS50ZXh0Q29udGVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JhbmdlID0gX3RoaXMub3B0aW9ucy5kb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JhbmdlLnNldFN0YXJ0KG5vZGUsIG5vZGUgPT09IHJhbmdlLnN0YXJ0Q29udGFpbmVyID8gcmFuZ2Uuc3RhcnRPZmZzZXQgOiAwKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSYW5nZS5zZXRFbmQobm9kZSwgbm9kZSA9PT0gcmFuZ2UuZW5kQ29udGFpbmVyID8gcmFuZ2UuZW5kT2Zmc2V0IDogbm9kZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlcy5wdXNoKG5ld1JhbmdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlID09PSByYW5nZS5lbmRDb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9fYXNzaWduKHt9LCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSYW5nZWU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUmFuZ2VlID0gUmFuZ2VlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmFuZ2VlXzEgPSByZXF1aXJlKFwiLi9SYW5nZWVcIik7XHJcbnZhciByYW5nZWUgPSBuZXcgUmFuZ2VlXzEuUmFuZ2VlKHsgZG9jdW1lbnQ6IGRvY3VtZW50IH0pO1xyXG52YXIgY2xvbmVkRXhhbXBsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVtb1wiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbnZhciByYW5nZVJlcHJlc2VudGF0aW9uU3RvcmFnZSA9IFtdO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgdmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XHJcbiAgICAgICAgaWYgKHJhbmdlKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5nZVJlcHJlc2VudGF0aW9uID0gcmFuZ2VlLmdldEVuY29kZWRSYW5nZShyYW5nZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJhbmdlUmVwcmVzZW50YXRpb24pO1xyXG4gICAgICAgICAgICByYW5nZVJlcHJlc2VudGF0aW9uU3RvcmFnZS5wdXNoKHJhbmdlUmVwcmVzZW50YXRpb24pO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2FkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlbW9cIikuaW5uZXJIVE1MID0gY2xvbmVkRXhhbXBsZS5pbm5lckhUTUw7XHJcbiAgICByYW5nZVJlcHJlc2VudGF0aW9uU3RvcmFnZS5mb3JFYWNoKGZ1bmN0aW9uIChyYW5nZVJlcHJlc2VudGF0aW9uKSB7XHJcbiAgICAgICAgdmFyIHJhbmdlcyA9IHJhbmdlZS5nZXREZWNvZGVkUmFuZ2VzKHJhbmdlUmVwcmVzZW50YXRpb24pO1xyXG4gICAgICAgIHJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChyYW5nZSkge1xyXG4gICAgICAgICAgICB2YXIgaGlnaGxpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1hcmtcIik7XHJcbiAgICAgICAgICAgIHJhbmdlLnN1cnJvdW5kQ29udGVudHMoaGlnaGxpZ2h0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNldFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZW1vXCIpLmlubmVySFRNTCA9IGNsb25lZEV4YW1wbGUuaW5uZXJIVE1MO1xyXG59KTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbGVhclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcmFuZ2VSZXByZXNlbnRhdGlvblN0b3JhZ2UgPSBbXTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=