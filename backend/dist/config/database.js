"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("".concat(process.env.MONGODB_URL), function (err) {
    if (err)
        throw err;
    console.log('MongoDB connected');
});
//# sourceMappingURL=database.js.map