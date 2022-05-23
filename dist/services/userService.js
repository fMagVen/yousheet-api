var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as userRepository from "../repositories/userRepository.js";
import * as errorUtils from "../utils/errorUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export function createUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var takenmail, takenick;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.readUserByEmail(data.email)];
                case 1:
                    takenmail = _a.sent();
                    if (takenmail)
                        throw errorUtils.conflictError("email already registered");
                    return [4 /*yield*/, userRepository.readUserByNickname(data.nickname)];
                case 2:
                    takenick = _a.sent();
                    if (takenick)
                        throw errorUtils.conflictError("nickname already taken, choose another one");
                    return [4 /*yield*/, userRepository.createUser(data)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function logUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.readUserByEmail(data.email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw errorUtils.notFoundError("user not found");
                    token = jwt.sign({ nickname: user === null || user === void 0 ? void 0 : user.nickname, email: user === null || user === void 0 ? void 0 : user.email }, process.env.JWT_SECRET);
                    return [2 /*return*/, token];
            }
        });
    });
}
export function updateUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var usermail, usernick, hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateUser(data)];
                case 1:
                    _a.sent();
                    if (!data.newEmail) return [3 /*break*/, 3];
                    return [4 /*yield*/, userRepository.readUserByEmail(data.newEmail)];
                case 2:
                    usermail = _a.sent();
                    if (usermail)
                        throw errorUtils.conflictError("this email is already in use");
                    _a.label = 3;
                case 3:
                    if (!data.newNickname) return [3 /*break*/, 5];
                    return [4 /*yield*/, userRepository.readUserByNickname(data.newNickname)];
                case 4:
                    usernick = _a.sent();
                    if (usernick)
                        throw errorUtils.conflictError("this nickname is already taken, choose another one");
                    _a.label = 5;
                case 5:
                    if (data.newPassword) {
                        hashedPassword = bcrypt.hashSync(data.newPassword, process.env.SALT);
                        data.newPassword = hashedPassword;
                    }
                    return [4 /*yield*/, userRepository.updateUser(data)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function deleteUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateUser(data)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, userRepository.deleteUser(data.email)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function validateUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.readUserByEmail(data.email)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        throw errorUtils.notFoundError("user not found");
                    if (user.nickname != data.nickname)
                        throw errorUtils.unauthorizedError("wrong nickname");
                    if (user.password != data.password)
                        throw errorUtils.unauthorizedError("wrong password");
                    return [2 /*return*/];
            }
        });
    });
}
export function testTruncateTableUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.testTruncateTableUsers()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function testSeedTableUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.testSeedTableUsers()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
