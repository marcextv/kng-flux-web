/**
 * URL String data manager utility class.
 * 
 * @author mdtorres
 */
class URLUtil {

    /**
     * Set base URL for services.
     * 
     * @param {String} resource Microsoft Graph resource services
     * @param {String} version Microsoft Graph version
     */
    static setInit(resource, version) {
        return resource + version;
    }

    /**
     * Set base Mail folder data.
     * 
     * @param {String} resource Microsoft Graph resource services
     * @param {String} version Microsoft Graph version
     * @param {String} mailFolder part of URL for mail folder
     */
    static setMailFolder(resource, version, mailFolder) {
        return this.setInit(resource, version) + mailFolder;
    }

    /**
     * Set base URL for calling services.
     * 
     * @param {String} resource Microsoft Graph resource services
     * @param {String} version Microsoft Graph version
     * @param {String} mailFolder part of URL for mail folder
     * @param {String} resourceURL URL part for inbox service access
     */
    static setBase(resource, version, mailFolder, resourceURL) {
        return this.setMailFolder(resource, version, mailFolder) + resourceURL;
    }

    /**
     * Set header for authroization into Microsoft Graph services.
     * 
     * @param {String} token session identifier
     */
    static setAuthorizationHeader(token) {
        return 'Bearer ' + token;
    }

    /**
     * Set URL for calling a mail detail.
     * 
     * @param {String} baseURL base url direction
     * @param {String} mailId mail identifier
     */
    static setMail(baseURL, mailId){
        return baseURL + '/' + mailId;
    }

    /**
     * Add part to url.
     * 
     * @param {String} baseURL base url
     * @param {String} mailId mail identifier
     * @param {String} newPart part of url to add
     */
    static addPart(baseURL, mailId, newPart){
        return this.setMail(baseURL, mailId) + newPart;
    }

    /**
     * Set URL for call service for listing attachments by mail id.
     * 
     * @param {String} baseURL base url direction
     * @param {String} mailId mail identifier
     * @param {String} attachmentURI part of direction that call attachments
     * @param {Boolean} onlyBasicInfo set if result shows only basic information of attachments
     * @param {String} basicInfo part of direction that set if result shows only basic information
     */
    static setListAttachments(baseURL, mailId, attachmentURI, onlyBasicInfo, basicInfo) {
        var result = baseURL + '/' + mailId + attachmentURI;
        if (onlyBasicInfo !== null && onlyBasicInfo === true) {
            result = result + '?' + basicInfo;
        }
        return result;
    }

    /**
     * Set URL of call service for move item to folder.
     * 
     * @param {String} baseURL base url direction
     * @param {String} mailId mail identifier
     * @param {String} moveURI part of direction that call move to folder
     */
    static setMoveItem(baseURL, mailId, moveURI) {
        return baseURL + '/' + mailId + moveURI;
    }

    /**
     * Set URL for search a folder.
     * 
     * @param {String} baseURL base URL
     * @param {String} folderName folder to be search
     */
    static setFindFolder(baseURL, folderName) {
        if(folderName.includes('/')) {
            return baseURL + folderName;
        }
        return baseURL + '/' + folderName;
    }

    /**
     * Set URL for calling a attachment by id.
     * 
     * @param {String} baseURL base url direction
     * @param {String} mailId mail identifier
     * @param {String} attachmentId attachment identifier
     * @param {String} attachmentURI part of direction that call attachment services
     * @param {Boolean} onlyBasicInfo set if result shows only basic information of attachment
     * @param {String} basicInfo part of direction that set if result shows only basic information
     */
    static setFindAttachments(baseURL, mailId, attachmentId, attachmentURI, onlyBasicInfo, basicInfo) {
        var result = this.setListAttachments(baseURL, mailId, attachmentURI, false, null) + '/' + attachmentId;
        if (onlyBasicInfo !== null && onlyBasicInfo === true) {
            result = result + '?' + basicInfo;
        }
        return result;
    }

    /**
     * Set Microsoft URL to be call into a GET petition.
     * 
     * @param {String} uri initial url for petition
     * @param {Number} top maximum mails results on petition
     * @param {Number} skip index for paginate result
     * @param {Boolean} orderby sort mails by create time
     * @param {Boolean} showAttachments set in uri if attachment information is needed
     * @param {String} expandAttachments part of direction that make service shows expanded attachments
     * @param {String} filter shows only last n months
     */
    static setListMail(uri, top, skip, orderby, showAttachments, expandAttachments, filter) {
        var result = uri;
        if (showAttachments) {
            result = uri + '?' + expandAttachments;
        }
        if (top) {
            result = this.addParameter(result, 'top', top);
        }
        if (skip) {
            result = this.addParameter(result, 'skip', skip);
        }
        const orderbyData = 'ReceivedDateTime ' + (orderby ? 'asc' : 'desc');
        result = this.addParameter(result, 'orderby', orderbyData);
        if(filter !== null){
            result = result + '&' + filter;
        }
        return result;
    }

    /**
     * Set Microsoft Graph URL to be call into a get petition.
     * 
     * @param {String} url initial url for petition
     * @param {Number} skipToken index for paginate result
     */
    static setListContact(url, skipToken) {
        if(skipToken !== null){
            return this.addParameter(url, 'skiptoken', skipToken);
        }
        return url;
    }

    /**
     * Put special character into URL.
     * 
     * @param {String} url data to be set
     * @param {String} parameter key data to be added to url
     * @param {Object} value data value of parameter
     */
    static addParameter(url, parameter, value) {
        var specialCharacter = '';
        if (url.includes('?')) {
            specialCharacter = '&$';
        } else {
            specialCharacter = '?';
        }
        return url + specialCharacter + parameter + '=' + value;
    }

}

export default URLUtil;