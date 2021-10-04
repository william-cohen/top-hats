//Paul Tero, July 2001
//http://www.tero.co.uk/des/
//
//Optimised for performance with large blocks by Michael Hayworth, November 2001
//http://www.netdealing.com
//
//THIS SOFTWARE IS PROVIDED "AS IS" AND
//ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
//FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
//OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
//SUCH DAMAGE.

//des
//this takes the key, the message, and whether to encrypt or decrypt
function des(key: string, message: string, encrypt: number) {
  //declaring this locally speeds things up a bit
  const spfunction1 = [
    0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400,
    0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404,
    0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404,
    0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000,
    0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400,
    0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404,
    0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404,
    0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004
  ]
  const spfunction2 = [
    -0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0,
    -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000,
    -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0,
    0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0,
    0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020,
    -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000,
    -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000,
    -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020,
    -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020,
    -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000
  ]
  const spfunction3 = [
    0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008,
    0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208,
    0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208,
    0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000,
    0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0,
    0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008,
    0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008,
    0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200
  ]
  const spfunction4 = [
    0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0,
    0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000,
    0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080,
    0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000,
    0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001,
    0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001,
    0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000,
    0x2000, 0x802080
  ]
  const spfunction5 = [
    0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000,
    0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100,
    0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0,
    0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0,
    0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100,
    0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100,
    0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000,
    0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000,
    0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000,
    0x2080100, 0x40000100
  ]
  const spfunction6 = [
    0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010,
    0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000,
    0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010,
    0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000,
    0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010,
    0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010,
    0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0,
    0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010,
    0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010
  ]
  const spfunction7 = [
    0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800,
    0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802,
    0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800,
    0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000,
    0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002,
    0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802,
    0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0,
    0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800,
    0x200002
  ]
  const spfunction8 = [
    0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40,
    0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040,
    0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040,
    0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000,
    0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040,
    0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040,
    0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040,
    0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040,
    0x1040, 0x40040, 0x10000000, 0x10041000
  ]

  //create the 16 or 48 subkeys we will need
  const keys = des_createKeys(key)
  let m = 0,
    i,
    j,
    temp,
    right1,
    right2,
    left,
    right,
    looping
  let cbcleft, cbcleft2, cbcright, cbcright2
  let endloop, loopinc
  const len = message.length
  let chunk = 0
  //set up the loops for single and triple des
  const iterations = keys.length == 32 ? 3 : 9 //single or triple des
  if (iterations == 3) {
    looping = encrypt ? [0, 32, 2] : [30, -2, -2]
  } else {
    looping = encrypt
      ? [0, 32, 2, 62, 30, -2, 64, 96, 2]
      : [94, 62, -2, 32, 64, 2, 30, -2, -2]
  }

  message += '\0\0\0\0\0\0\0\0' //pad the message out with null bytes

  //store the result here
  let result = ''
  let tempresult = ''

  //loop through each 64 bit chunk of the message
  while (m < len) {
    left =
      (message.charCodeAt(m++) << 24) |
      (message.charCodeAt(m++) << 16) |
      (message.charCodeAt(m++) << 8) |
      message.charCodeAt(m++)
    right =
      (message.charCodeAt(m++) << 24) |
      (message.charCodeAt(m++) << 16) |
      (message.charCodeAt(m++) << 8) |
      message.charCodeAt(m++)

    //first each 64 but chunk of the message must be permuted according to IP
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f
    right ^= temp
    left ^= temp << 4
    temp = ((left >>> 16) ^ right) & 0x0000ffff
    right ^= temp
    left ^= temp << 16
    temp = ((right >>> 2) ^ left) & 0x33333333
    left ^= temp
    right ^= temp << 2
    temp = ((right >>> 8) ^ left) & 0x00ff00ff
    left ^= temp
    right ^= temp << 8
    temp = ((left >>> 1) ^ right) & 0x55555555
    right ^= temp
    left ^= temp << 1

    left = (left << 1) | (left >>> 31)
    right = (right << 1) | (right >>> 31)

    //do this either 1 or 3 times for each chunk of the message
    for (j = 0; j < iterations; j += 3) {
      endloop = looping[j + 1]
      loopinc = looping[j + 2]
      //now go through and perform the encryption or decryption
      for (i = looping[j]; i != endloop; i += loopinc) {
        //for efficiency
        right1 = right ^ keys[i]
        right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1]
        //the result is attained by passing these bytes through the S selection functions
        temp = left
        left = right
        right =
          temp ^
          (spfunction2[(right1 >>> 24) & 0x3f] |
            spfunction4[(right1 >>> 16) & 0x3f] |
            spfunction6[(right1 >>> 8) & 0x3f] |
            spfunction8[right1 & 0x3f] |
            spfunction1[(right2 >>> 24) & 0x3f] |
            spfunction3[(right2 >>> 16) & 0x3f] |
            spfunction5[(right2 >>> 8) & 0x3f] |
            spfunction7[right2 & 0x3f])
      }
      temp = left
      left = right
      right = temp //unreverse left and right
    } //for either 1 or 3 iterations

    //move then each one bit to the right
    left = (left >>> 1) | (left << 31)
    right = (right >>> 1) | (right << 31)

    //now perform IP-1, which is IP in the opposite direction
    temp = ((left >>> 1) ^ right) & 0x55555555
    right ^= temp
    left ^= temp << 1
    temp = ((right >>> 8) ^ left) & 0x00ff00ff
    left ^= temp
    right ^= temp << 8
    temp = ((right >>> 2) ^ left) & 0x33333333
    left ^= temp
    right ^= temp << 2
    temp = ((left >>> 16) ^ right) & 0x0000ffff
    right ^= temp
    left ^= temp << 16
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f
    right ^= temp
    left ^= temp << 4

    tempresult += String.fromCharCode(
      left >>> 24,
      (left >>> 16) & 0xff,
      (left >>> 8) & 0xff,
      left & 0xff,
      right >>> 24,
      (right >>> 16) & 0xff,
      (right >>> 8) & 0xff,
      right & 0xff
    )

    chunk += 8
    if (chunk == 512) {
      result += tempresult
      tempresult = ''
      chunk = 0
    }
  } //for every 8 characters, or 64 bits in the message

  //return the result as an array
  return result + tempresult
} //end of des

//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
function des_createKeys(key: string) {
  //declaring this locally speeds things up a bit
  const pc2bytes0 = [
    0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004,
    0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200,
    0x20010204
  ]
  const pc2bytes1 = [
    0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001,
    0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101
  ]
  const pc2bytes2 = [
    0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8,
    0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808
  ]
  const pc2bytes3 = [
    0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000,
    0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000,
    0x8222000
  ]
  const pc2bytes4 = [
    0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000,
    0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010
  ]
  const pc2bytes5 = [
    0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400,
    0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420
  ]
  const pc2bytes6 = [
    0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0,
    0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002
  ]
  const pc2bytes7 = [
    0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800,
    0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800,
    0x20030800
  ]
  const pc2bytes8 = [
    0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000,
    0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002
  ]
  const pc2bytes9 = [
    0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400,
    0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408
  ]
  const pc2bytes10 = [
    0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020,
    0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020
  ]
  const pc2bytes11 = [
    0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200,
    0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200,
    0x5200200
  ]
  const pc2bytes12 = [
    0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000,
    0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010
  ]
  const pc2bytes13 = [
    0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1,
    0x5, 0x101, 0x105
  ]

  //how many iterations (1 for des, 3 for triple des)
  const iterations = key.length > 8 ? 3 : 1 //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
  //stores the return keys
  const keys = new Array(32 * iterations)
  //now define the left shifts which need to be done
  const shifts = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0]
  //other variables
  let lefttemp,
    righttemp,
    m = 0,
    n = 0,
    temp

  for (let j = 0; j < iterations; j++) {
    //either 1 or 3 iterations
    let left =
      (key.charCodeAt(m++) << 24) |
      (key.charCodeAt(m++) << 16) |
      (key.charCodeAt(m++) << 8) |
      key.charCodeAt(m++)
    let right =
      (key.charCodeAt(m++) << 24) |
      (key.charCodeAt(m++) << 16) |
      (key.charCodeAt(m++) << 8) |
      key.charCodeAt(m++)

    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f
    right ^= temp
    left ^= temp << 4
    temp = ((right >>> -16) ^ left) & 0x0000ffff
    left ^= temp
    right ^= temp << -16
    temp = ((left >>> 2) ^ right) & 0x33333333
    right ^= temp
    left ^= temp << 2
    temp = ((right >>> -16) ^ left) & 0x0000ffff
    left ^= temp
    right ^= temp << -16
    temp = ((left >>> 1) ^ right) & 0x55555555
    right ^= temp
    left ^= temp << 1
    temp = ((right >>> 8) ^ left) & 0x00ff00ff
    left ^= temp
    right ^= temp << 8
    temp = ((left >>> 1) ^ right) & 0x55555555
    right ^= temp
    left ^= temp << 1

    //the right side needs to be shifted and to get the last four bits of the left side
    temp = (left << 8) | ((right >>> 20) & 0x000000f0)
    //left needs to be put upside down
    left =
      (right << 24) |
      ((right << 8) & 0xff0000) |
      ((right >>> 8) & 0xff00) |
      ((right >>> 24) & 0xf0)
    right = temp

    //now go through and perform these shifts on the left and right keys
    for (let i = 0; i < shifts.length; i++) {
      //shift the keys either one or two bits to the left
      if (shifts[i]) {
        left = (left << 2) | (left >>> 26)
        right = (right << 2) | (right >>> 26)
      } else {
        left = (left << 1) | (left >>> 27)
        right = (right << 1) | (right >>> 27)
      }
      left &= -0xf
      right &= -0xf

      //now apply PC-2, in such a way that E is easier when encrypting or decrypting
      //this conversion will look like PC-2 except only the last 6 bits of each byte are used
      //rather than 48 consecutive bits and the order of lines will be according to
      //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
      lefttemp =
        pc2bytes0[left >>> 28] |
        pc2bytes1[(left >>> 24) & 0xf] |
        pc2bytes2[(left >>> 20) & 0xf] |
        pc2bytes3[(left >>> 16) & 0xf] |
        pc2bytes4[(left >>> 12) & 0xf] |
        pc2bytes5[(left >>> 8) & 0xf] |
        pc2bytes6[(left >>> 4) & 0xf]
      righttemp =
        pc2bytes7[right >>> 28] |
        pc2bytes8[(right >>> 24) & 0xf] |
        pc2bytes9[(right >>> 20) & 0xf] |
        pc2bytes10[(right >>> 16) & 0xf] |
        pc2bytes11[(right >>> 12) & 0xf] |
        pc2bytes12[(right >>> 8) & 0xf] |
        pc2bytes13[(right >>> 4) & 0xf]
      temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff
      keys[n++] = lefttemp ^ temp
      keys[n++] = righttemp ^ (temp << 16)
    }
  } //for each iterations
  //return the keys we've created
  return keys
} //end of des_createKeys

////////////////////////////// TEST //////////////////////////////
function stringToHex(s: string) {
  let r = '0x'
  const hexes = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ]
  for (let i = 0; i < s.length; i++) {
    r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf]
  }
  return r
}

function hexToString(h: string) {
  let r = ''
  for (let i = h.substr(0, 2) == '0x' ? 2 : 0; i < h.length; i += 2) {
    r += String.fromCharCode(parseInt(h.substr(i, 2), 16))
  }
  return r
}

export function javascript_des_encryption(
  key: string,
  message: string
): string {
  return stringToHex(des(SHA256.hash(key), message, 1))
}

export function javascript_des_decryption(
  key: string,
  message: string
): string {
  return des(SHA256.hash(key), hexToString(message), 0)
}

// SHA-256 hash function. Copyright-free.
// Requires typed arrays.
const SHA256 = {
  K: [] as number[],
  digest: (message: string): Uint8Array => new Uint8Array(),
  hash: (message: string): string => ''
}

SHA256.K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]

// The digest function returns the hash value (digest)
// as a 32 byte (typed) array.
// message: the string or byte array to hash
SHA256.digest = function (message: string | Uint8Array) {
  let h0 = 0x6a09e667
  let h1 = 0xbb67ae85
  let h2 = 0x3c6ef372
  let h3 = 0xa54ff53a
  let h4 = 0x510e527f
  let h5 = 0x9b05688c
  let h6 = 0x1f83d9ab
  let h7 = 0x5be0cd19
  const K = SHA256.K
  if (typeof message == 'string') {
    const s = unescape(encodeURIComponent(message)) // UTF-8
    message = new Uint8Array(s.length)
    for (let i = 0; i < s.length; i++) {
      message[i] = s.charCodeAt(i) & 0xff
    }
  }
  const length = message.length
  const byteLength = Math.floor((length + 72) / 64) * 64
  const wordLength = byteLength / 4
  const bitLength = length * 8
  const m = new Uint8Array(byteLength)
  m.set(message)
  m[length] = 0x80
  m[byteLength - 4] = bitLength >>> 24
  m[byteLength - 3] = (bitLength >>> 16) & 0xff
  m[byteLength - 2] = (bitLength >>> 8) & 0xff
  m[byteLength - 1] = bitLength & 0xff
  const words = new Int32Array(wordLength)
  let byteIndex = 0
  for (let i = 0; i < words.length; i++) {
    let word = m[byteIndex++] << 24
    word |= m[byteIndex++] << 16
    word |= m[byteIndex++] << 8
    word |= m[byteIndex++]
    words[i] = word
  }
  const w = new Int32Array(64)
  for (let j = 0; j < wordLength; j += 16) {
    for (let i = 0; i < 16; i++) {
      w[i] = words[j + i]
    }
    for (let i = 16; i < 64; i++) {
      let v = w[i - 15]
      let s0 = (v >>> 7) | (v << 25)
      s0 ^= (v >>> 18) | (v << 14)
      s0 ^= v >>> 3
      v = w[i - 2]
      let s1 = (v >>> 17) | (v << 15)
      s1 ^= (v >>> 19) | (v << 13)
      s1 ^= v >>> 10
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) & 0xffffffff
    }
    let a = h0
    let b = h1
    let c = h2
    let d = h3
    let e = h4
    let f = h5
    let g = h6
    let h = h7
    for (let i = 0; i < 64; i++) {
      let s1 = (e >>> 6) | (e << 26)
      s1 ^= (e >>> 11) | (e << 21)
      s1 ^= (e >>> 25) | (e << 7)
      const ch = (e & f) ^ (~e & g)
      const temp1 = (h + s1 + ch + K[i] + w[i]) & 0xffffffff
      let s0 = (a >>> 2) | (a << 30)
      s0 ^= (a >>> 13) | (a << 19)
      s0 ^= (a >>> 22) | (a << 10)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const temp2 = (s0 + maj) & 0xffffffff
      h = g
      g = f
      f = e
      e = (d + temp1) & 0xffffffff
      d = c
      c = b
      b = a
      a = (temp1 + temp2) & 0xffffffff
    }
    h0 = (h0 + a) & 0xffffffff
    h1 = (h1 + b) & 0xffffffff
    h2 = (h2 + c) & 0xffffffff
    h3 = (h3 + d) & 0xffffffff
    h4 = (h4 + e) & 0xffffffff
    h5 = (h5 + f) & 0xffffffff
    h6 = (h6 + g) & 0xffffffff
    h7 = (h7 + h) & 0xffffffff
  }
  const hash = new Uint8Array(32)
  for (let i = 0; i < 4; i++) {
    hash[i] = (h0 >>> (8 * (3 - i))) & 0xff
    hash[i + 4] = (h1 >>> (8 * (3 - i))) & 0xff
    hash[i + 8] = (h2 >>> (8 * (3 - i))) & 0xff
    hash[i + 12] = (h3 >>> (8 * (3 - i))) & 0xff
    hash[i + 16] = (h4 >>> (8 * (3 - i))) & 0xff
    hash[i + 20] = (h5 >>> (8 * (3 - i))) & 0xff
    hash[i + 24] = (h6 >>> (8 * (3 - i))) & 0xff
    hash[i + 28] = (h7 >>> (8 * (3 - i))) & 0xff
  }
  return hash
}

// The hash function returns the hash value as a hex string.
// message: the string or byte array to hash
SHA256.hash = function (message) {
  const digest = SHA256.digest(message)
  let hex = ''
  for (let i = 0; i < digest.length; i++) {
    const s = '0' + digest[i].toString(16)
    hex += s.length > 2 ? s.substring(1) : s
  }
  return hex
}
