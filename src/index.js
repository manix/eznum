class BaseNumber {

  constructor(value) {
    this.round = 2;
    this.value = value;
    this.prefix = "";
    this.suffix = "";
    this.separatorThousands = "";
    this.separatorDecimal = ".";
  }

  format() {
    return this.value;
  }

  toString() {
    return this.prefix + this.format().toLocaleString("en", {
      minimumFractionDigits: this.round,
      maximumFractionDigits: this.round
    }).replace(/\,/g, this.separatorThousands).replace(".", this.separatorDecimal) + this.suffix;
  }

}

class ByteNumber extends BaseNumber {

  format() {
    let pow = this.value ? Math.floor(Math.log(this.value) / ByteNumber.log1k) : 0;
    this.suffix = " " + ByteNumber.units[pow];
    return (this.value / Math.pow(1024, pow));
  }
}

ByteNumber.units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
ByteNumber.log1k = Math.log(1024);

exports.Byte = ByteNumber;



class StatNumber extends BaseNumber {

  format() {
    if (this.value > 1000) {
      for (let i = 1e12; i > 1; i /= 1e3) {
        if (this.value > i) {
          this.suffix = " " + StatNumber.units[Math.log10(i) / 3];
          return this.value / i;
        }
      }
    }

    return this.value;
  }
}

StatNumber.units = ["", "K", "M", "B", "T"];

exports.Stat = StatNumber;
