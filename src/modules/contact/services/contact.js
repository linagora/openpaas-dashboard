export default class Contact {
  constructor(vcard) {
    this.id = vcard.getFirstPropertyValue("uid");
    this.displayName = vcard.getFirstPropertyValue("fn");

    var name = vcard.getFirstPropertyValue("n");

    this.firstName = name ? name[1] : "";
    this.lastName = name ? name[0] : "";

    this.org = vcard.getFirstPropertyValue("org");
    this.orgName = this.org ? this.org[0] : "";
    this.orgRole = vcard.getFirstPropertyValue("role");

    let photo = vcard.getFirstPropertyValue("photo");

    if (photo) {
      if (photo.indexOf("http") !== 0) {
        photo = `data:image/png;base64,${photo}`;
      }
      this.avatarUrl = photo;
    }

    this.emails = getMultiValue(vcard, "email", ["Work", "Home", "Other"]).map(mail => {
      mail.value = mail.value.replace(/^mailto:/i, "");

      return mail;
    });
  }
}

function getMultiValue(vcard, propName, supportedTypes) {
  var props = vcard.getAllProperties(propName);

  return props.map(function(prop) {
    var data = {
      value: prop.getFirstValue()
    };

    var type = _getSuitableType(prop.getParameter("type"), supportedTypes);

    if (type) {
      data.type = type;
    }

    return data;
  });
}

function _getSuitableType(types, supportedTypes) {
  if (!types) {
    return types;
  }

  if (!Array.isArray(types)) {
    types = [types];
  }

  if (!supportedTypes) {
    return types[0];
  }

  var suitableTypes = types.filter(function(type) {
    return supportedTypes.some(function(supportedType) {
      return _equalCaseInsensitive(supportedType, type);
    });
  });

  if (suitableTypes.length) {
    return suitableTypes[0];
  }

  return "Other";
}

function _equalCaseInsensitive(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase();
}
