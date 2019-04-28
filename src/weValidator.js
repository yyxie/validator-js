export default class WeValidator {
  constructor(options) {
    this.rules = options.rules;
    this.messages = options.messages;
  }

  dealRule(value, rules, messages) {
    let result = true;
    for (const k in rules) {
      console.log('进入for (const k in rules)')
      /* if (!result) {
        return false;
      } */
      switch (k) {
      case 'required': {
        if (!value) {
          result = false;
          return messages[k];
        }
        break;
      }
      case 'len': {
        if (value && value.length > rules[k]) {
          result = false;
          return messages[k];
        }
        break;
      }
      case 'number': {
        if (value && !value.test(/^\d+$/)) {
          result = false;
          return messages[k];
        }
        break;
      }
      default: {
        if (typeof rules[k] == 'function') {
          result = rules[k](value);
          if (result) {
            return result;
          }
        } else {
          console.error('自定义规则必须为方法')
        }
        break;
      }
      }
    }
  }


  checkData(data) {
    let errorMsg = '';
    if (data && data.toString() === '[object Object]') {
      for (const key in data) {
        const rule = this.rules[key];
        const messages = this.messages[key];
        if (rule) {
          const value = data[key];
          errorMsg = this.dealRule(value, rule, messages);
          if (errorMsg) {
            console.error(errorMsg);
            Wevalidator.showMessage && Wevalidator.showMessage(errorMsg);
            return false;
          }
        }
      }
    } else {
      console.error('传入的数据类型应该是对象类型')
    }
    return true;
  }
}
