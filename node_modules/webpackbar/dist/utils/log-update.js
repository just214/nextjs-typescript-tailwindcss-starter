'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ansiEscapes = require('ansi-escapes');

var _ansiEscapes2 = _interopRequireDefault(_ansiEscapes);

var _wrapAnsi = require('wrap-ansi');

var _wrapAnsi2 = _interopRequireDefault(_wrapAnsi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on https://github.com/sindresorhus/log-update/blob/master/index.js

class LogUpdate {
  constructor() {
    this.prevLineCount = 0;
    this.listening = false;
    this.extraLines = '';
    this._onData = this._onData.bind(this);
    this._streams = [process.stdout, process.stderr];
  }

  render(lines) {
    this.listen();

    const wrappedLines = (0, _wrapAnsi2.default)(lines, this.columns, {
      trim: false,
      hard: true,
      wordWrap: false
    });

    const data = _ansiEscapes2.default.eraseLines(this.prevLineCount) + wrappedLines + '\n' + this.extraLines;

    this.write(data);

    this.prevLineCount = data.split('\n').length;
  }

  get columns() {
    return (process.stderr.columns || 80) - 2;
  }

  write(data) {
    if (process.stderr.__write) {
      process.stderr.__write(data, 'utf-8');
    } else {
      process.stderr.write(data, 'utf-8');
    }
  }

  clear() {
    this.done();
    this.write(_ansiEscapes2.default.eraseLines(this.prevLineCount));
  }

  done() {
    this.stopListen();

    this.prevLineCount = 0;
    this.extraLines = '';
  }

  _onData(data) {
    const str = String(data);
    const lines = str.split('\n').length - 1;
    if (lines > 0) {
      this.prevLineCount += lines;
      this.extraLines += data;
    }
  }

  listen() {
    if (this.listening) {
      return;
    }

    const t = this;

    for (const stream of this._streams) {
      if (!stream.__write) {
        stream.__write = stream.write;
        stream.write = function write(data, ...args) {
          t._onData(data);
          this.__write(data, ...args);
        };
      }
    }

    this.listening = true;
  }

  stopListen() {
    for (const stream of this._streams) {
      if (stream.__write) {
        stream.write = stream.__write;
        delete stream.__write;
      }
    }

    this.listening = false;
  }
}
exports.default = LogUpdate;