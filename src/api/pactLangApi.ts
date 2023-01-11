import {Buffer} from 'buffer';

const b64url = (function () {
  'use strict';

  var chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  function base64UrlEncode(input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      // str.charAt (idx | 0) || (map = '=', idx % 1);
      str.charAt(idx | 0);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
    ) {
      charCode = str.charCodeAt((idx += 3 / 4));
      if (charCode > 0xff) {
        throw new InvalidCharacterError(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        );
      }
      block = (block << 8) | charCode;
    }
    return output;
  }

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  function base64UrlDecode(input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 === 1) {
      throw new InvalidCharacterError(
        "'atob' failed: The string to be decoded is not correctly encoded.",
      );
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      (buffer = str.charAt(idx++)); // eslint-disable-line no-cond-assign
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  return {encode: base64UrlEncode, decode: base64UrlDecode};
})();

const binToHex = function (s: any) {
  const constructor = s.constructor.name || null;

  if (constructor !== 'Uint8Array') {
    throw new TypeError('Expected Uint8Array');
  }

  return Buffer.from(s).toString('hex');
};

const hexToBin = function (h: any) {
  if (typeof h !== 'string') {
    throw new TypeError('Expected string: ' + h);
  }
  return new Uint8Array(Buffer.from(h, 'hex'));
};

const hashBin = function (s: string) {
  return require('blakejs').blake2b(s, null, 32);
};

function uint8ArrayToStr(a) {
  return String.fromCharCode.apply(null, new Uint16Array(a));
}

function b64urlEncodeArr(input: any) {
  return b64url.encode(uint8ArrayToStr(input));
}

const hash = function (s) {
  return b64urlEncodeArr(hashBin(s));
};

const mkReq = function (cmd: any) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(cmd),
  };
};

const mkPublicSend = function (cmds: any | any[]) {
  return {cmds: asArray(cmds)};
};

const parseRes = async function (raw: any) {
  const rawRes = await raw;
  const res = await rawRes;
  if (res.ok) {
    return await rawRes.json();
  } else {
    return await rawRes.text();
  }
};

const asArray = function (singleOrArray: any | any[]) {
  if (Array.isArray(singleOrArray)) {
    return singleOrArray;
  } else {
    return [singleOrArray];
  }
};

const enforceArray = function (val: any[], msg: string) {
  if (!Array.isArray(val)) {
    throw new TypeError(msg + ' must be an array: ' + JSON.stringify(val));
  }
};

const enforceType = function (val: any, type: string, msg: string) {
  if (typeof val !== type) {
    throw new TypeError(
      msg + ' must be a ' + type + ': ' + JSON.stringify(val),
    );
  }
};

const mkSigner = function (kp: any) {
  if (kp.clist) {
    return {
      clist: asArray(kp.clist),
      pubKey: kp.publicKey,
    };
  } else {
    return {pubKey: kp.publicKey};
  }
};

const toTweetNaclSecretKey = function (keyPair: any) {
  if (
    // eslint-disable-next-line no-prototype-builtins
    !keyPair.hasOwnProperty('publicKey') ||
    // eslint-disable-next-line no-prototype-builtins
    !keyPair.hasOwnProperty('secretKey')
  ) {
    throw new TypeError(
      "Invalid KeyPair: expected to find keys of name 'secretKey' and 'publicKey': " +
        JSON.stringify(keyPair),
    );
  }
  return hexToBin(keyPair.secretKey + keyPair.publicKey);
};

const sign = function (msg: any, keyPair: any) {
  if (
    // eslint-disable-next-line no-prototype-builtins
    !keyPair.hasOwnProperty('publicKey') ||
    // eslint-disable-next-line no-prototype-builtins
    !keyPair.hasOwnProperty('secretKey')
  ) {
    throw new TypeError(
      "Invalid KeyPair: expected to find keys of name 'secretKey' and 'publicKey': " +
        JSON.stringify(keyPair),
    );
  }
  const hshBin = hashBin(msg);
  const hsh = b64urlEncodeArr(hshBin);
  const sigBin = require('tweetnacl').sign.detached(
    hshBin,
    toTweetNaclSecretKey(keyPair),
  );
  return {hash: hsh, sig: binToHex(sigBin), pubKey: keyPair.publicKey};
};

const pullSig = function (s: string) {
  // eslint-disable-next-line no-prototype-builtins
  if (!s.hasOwnProperty('sig')) {
    throw new TypeError(
      "Expected to find keys of name 'sig' in " + JSON.stringify(s),
    );
  }
  return {sig: s.sig};
};

const pullAndCheckHashs = function (sigs: any[]) {
  const hsh = sigs[0].hash;
  for (let i = 1; i < sigs.length; i++) {
    if (sigs[i].hash !== hsh) {
      throw new Error(
        'Sigs for different hashes found: ' + JSON.stringify(sigs),
      );
    }
  }
  return hsh;
};

const attachSig = function (msg: any, kpArray: any[]) {
  const hshBin = hashBin(msg);
  const hsh = b64urlEncodeArr(hshBin);
  if (kpArray.length === 0) {
    return [{hash: hsh, sig: undefined}];
  } else {
    return kpArray.map((kp: any) => {
      if (
        // eslint-disable-next-line no-prototype-builtins
        kp.hasOwnProperty('publicKey') &&
        kp.publicKey &&
        // eslint-disable-next-line no-prototype-builtins
        kp.hasOwnProperty('secretKey') &&
        kp.secretKey
      ) {
        return sign(msg, kp);
      } else {
        return {
          hash: hsh,
          sig: undefined,
          publicKey: kp.publicKey,
        };
      }
    });
  }
};

const mkSingleCmd = function (sigs: any[], cmd: any) {
  enforceArray(sigs, 'sigs');
  enforceType(cmd, 'string', 'cmd');
  return {
    hash: pullAndCheckHashs(sigs),
    sigs: sigs.filter(sig => sig.sig).map(pullSig),
    cmd: cmd,
  };
};

const prepareContCmd = function (
  keyPairs: any[] = [],
  nonce: string = new Date().toISOString(),
  proof: any,
  pactId: string,
  rollback: any,
  step: number,
  envData: any,
  meta: any = mkMeta('', '', 0, 0, 0, 0),
  networkId: string | number | null = null,
) {
  enforceType(nonce, 'string', 'nonce');
  var kpArray = asArray(keyPairs);
  var signers = kpArray.map(mkSigner);
  var cmdJSON = {
    networkId: networkId,
    payload: {
      cont: {
        proof: proof || null,
        pactId: pactId,
        rollback: rollback,
        step: step,
        data: envData || {},
      },
    },
    signers: signers,
    meta: meta,
    nonce: JSON.stringify(nonce),
  };
  var cmd = JSON.stringify(cmdJSON);
  var sigs = attachSig(cmd, kpArray);
  return mkSingleCmd(sigs, cmd);
};

const prepareExecCmd = function (
  keyPairs: any[] = [],
  nonce: string = new Date().toISOString(),
  pactCode: string,
  envData: any,
  meta: any = mkMeta('', '', 0, 0, 0, 0),
  networkId: string | number | null = null,
) {
  enforceType(nonce, 'string', 'nonce');
  enforceType(pactCode, 'string', 'pactCode');
  const kpArray = asArray(keyPairs);
  const signers = kpArray.map(mkSigner);
  const cmdJSON = {
    networkId: networkId,
    payload: {
      exec: {
        data: envData || {},
        code: pactCode,
      },
    },
    signers: signers,
    meta: meta,
    nonce: JSON.stringify(nonce),
  };
  const cmd = JSON.stringify(cmdJSON);
  const sigs = attachSig(cmd, kpArray);
  return mkSingleCmd(sigs, cmd);
};

const mkCap = function (
  role: string,
  description: string,
  name: string,
  args: any[] = [],
) {
  enforceType(role, 'string', 'role');
  enforceType(description, 'string', 'description');
  enforceType(name, 'string', 'name of capability');
  enforceType(args, 'object', 'arguments to capability');
  return {
    role: role,
    description: description,
    cap: {
      name: name,
      args: args,
    },
  };
};

const simpleExecCommand = function (
  keyPairs: any[],
  nonce: string,
  pactCode: string,
  envData: any,
  meta: any,
  networkId: string | number | null,
) {
  return mkPublicSend(
    prepareExecCmd(keyPairs, nonce, pactCode, envData, meta, networkId),
  );
};

const simpleContCommand = function (
  keyPairs: any[],
  nonce: string,
  step: number,
  pactId: string,
  rollback: any,
  envData: any,
  meta: any,
  proof: any,
  networkId: string | number | null,
) {
  return mkPublicSend(
    prepareContCmd(
      keyPairs,
      nonce,
      proof,
      pactId,
      rollback,
      step,
      envData,
      meta,
      networkId,
    ),
  );
};

const mkMeta = function (
  sender: string,
  chainId: string,
  gasPrice: number,
  gasLimit: number,
  creationTime: number,
  ttl: number,
) {
  enforceType(sender, 'string', 'sender');
  enforceType(chainId, 'string', 'chainId');
  enforceType(gasPrice, 'number', 'gasPrice');
  enforceType(gasLimit, 'number', 'gasLimit');
  enforceType(creationTime, 'number', 'creationTime');
  enforceType(ttl, 'number', 'ttl');
  return {
    creationTime: creationTime,
    ttl: ttl,
    gasLimit: gasLimit,
    chainId: chainId,
    gasPrice: gasPrice,
    sender: sender,
  };
};

const fetchLocal = async function (localCmd: any, apiHost: string) {
  let res = fetchLocalRaw(localCmd, apiHost);
  return parseRes(res);
};

const fetchLocalRaw = function (localCmd: any, apiHost: string) {
  if (!apiHost) {
    throw new Error('Pact.fetch.local(): No apiHost provided');
  }
  const {keyPairs, nonce, pactCode, envData, meta, networkId} = localCmd;
  const cmd = prepareExecCmd(
    keyPairs,
    nonce,
    pactCode,
    envData,
    meta,
    networkId,
  );
  return fetch(`${apiHost}/api/v1/local`, mkReq(cmd));
};

const fetchSend = async function (sendCmd: any, apiHost: string) {
  let res = fetchSendRaw(sendCmd, apiHost);
  return parseRes(res);
};

const fetchSendRaw = function (sendCmd: any, apiHost: string) {
  if (!apiHost) {
    throw new Error('Pact.fetch.send(): No apiHost provided');
  }
  const sendCmds = asArray(sendCmd).map(cmd => {
    if (cmd.type === 'cont') {
      return prepareContCmd(
        cmd.keyPairs,
        cmd.nonce,
        cmd.proof,
        cmd.pactId,
        cmd.rollback,
        cmd.step,
        cmd.envData,
        cmd.meta,
        cmd.networkId,
      );
    } else {
      return prepareExecCmd(
        cmd.keyPairs,
        cmd.nonce,
        cmd.pactCode,
        cmd.envData,
        cmd.meta,
        cmd.networkId,
      );
    }
  });
  return fetch(`${apiHost}/api/v1/send`, mkReq(mkPublicSend(sendCmds)));
};

const fetchPoll = async function (pollCmd: any, apiHost: string) {
  let res = fetchPollRaw(pollCmd, apiHost);
  return parseRes(res);
};

const fetchPollRaw = function (pollCmd: any, apiHost: string) {
  if (!apiHost) {
    throw new Error('Pact.fetch.poll(): No apiHost provided');
  }
  return fetch(`${apiHost}/api/v1/poll`, mkReq(pollCmd));
};

const fetchListen = async function (listenCmd: any, apiHost: string) {
  let res = fetchListenRaw(listenCmd, apiHost);
  return parseRes(res);
};

const fetchListenRaw = function (listenCmd: any, apiHost: string) {
  if (!apiHost) {
    throw new Error('Pact.fetch.listen(): No apiHost provided');
  }
  return fetch(`${apiHost}/api/v1/listen`, mkReq(listenCmd));
};

const fetchSPV = async function (spvCmd: any, apiHost: string) {
  let res = fetchSPVRaw(spvCmd, apiHost);
  return parseRes(res);
};

const fetchSPVRaw = function (spvCmd: any, apiHost: string) {
  if (!apiHost) {
    throw new Error('Pact.fetch.spv(): No apiHost provided');
  }
  enforceType(spvCmd.targetChainId, 'string', 'targetChainId');
  enforceType(spvCmd.requestKey, 'string', 'requestKey');
  return fetch(`${apiHost}/spv`, mkReq(spvCmd));
};

const restoreKeyPairFromSecretKey = function (seed: string) {
  if (!seed) {
    throw new Error('seed for KeyPair generation not provided');
  }
  if (seed.length !== 64) {
    throw new Error('Seed for KeyPair generation has bad size');
  }
  const seedForNacl = hexToBin(seed);
  const kp = require('tweetnacl').sign.keyPair.fromSeed(seedForNacl);
  var pubKey = binToHex(kp.publicKey);
  const secKey = binToHex(kp.secretKey).slice(0, 64);
  return {publicKey: pubKey, secretKey: secKey};
};

const genKeyPair = function () {
  const kp = require('tweetnacl').sign.keyPair();
  const pubKey = binToHex(kp.publicKey);
  const secKey = binToHex(kp.secretKey).slice(0, 64);
  return {publicKey: pubKey, secretKey: secKey};
};

export const Pact = {
  crypto: {
    binToHex: binToHex,
    hexToBin: hexToBin,
    base64UrlEncode: b64url.encode,
    base64UrlDecode: b64url.decode,
    base64UrlEncodeArr: b64urlEncodeArr,
    uint8ArrayToStr: uint8ArrayToStr,
    hash: hash,
    hashBin: hashBin,
    genKeyPair: genKeyPair,
    restoreKeyPairFromSecretKey: restoreKeyPairFromSecretKey,
    sign: sign,
  },
  api: {
    prepareContCmd: prepareContCmd,
    prepareExecCmd: prepareExecCmd,
    mkSingleCmd: mkSingleCmd,
    mkPublicSend: mkPublicSend,
  },
  lang: {
    mkMeta: mkMeta,
    mkCap: mkCap,
  },
  simple: {
    cont: {
      createCommand: simpleContCommand,
    },
    exec: {
      createCommand: simpleExecCommand,
      createLocalCommand: prepareExecCmd,
    },
  },
  fetch: {
    send: fetchSend,
    local: fetchLocal,
    poll: fetchPoll,
    listen: fetchListen,
    spv: fetchSPV,
  },
};
