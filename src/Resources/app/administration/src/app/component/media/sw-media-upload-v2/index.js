const {Component} = Shopware;
const {fileReader} = Shopware.Utils

Component.override('sw-media-upload-v2', {
    methods: {
        checkFileType(file) {
            if (!this.fileAccept || this.fileAccept === '*/*') {
                return true;
            }

            const fileTypes = this.fileAccept.replaceAll(' ', '').split(',');

            this.isCorrectFileType = fileTypes.some(fileType => {
                const currentFileType = file?.type || file?.mimeType || '';

                if (fileType.substring(0, 1) === '.' || currentFileType.length === 0) {
                    const fileInfo = fileReader.getNameAndExtensionFromFile(file);
                    const fileExtension = `.${fileInfo?.extension || ''}`;

                    return (fileType === fileExtension);
                } else {
                    const currentFileTypeParts = currentFileType.split('/');
                    const fileAcceptType = fileType.split('/');

                    if (fileAcceptType[0] !== currentFileTypeParts[0]) {
                        return false;
                    }

                    if (fileAcceptType[1] === '*') {
                        return true;
                    }

                    return fileAcceptType[1] === currentFileTypeParts[1];
                }
            });

            if (this.isCorrectFileType) {
                return true;
            }

            this.createNotificationError({
                title: this.$tc('global.default.error'),
                message: this.$tc('global.sw-media-upload-v2.notification.invalidFileType.message', 0, {
                    name: file.name || file.fileName,
                    supportedTypes: this.fileAccept,
                }),
            });
            return false;
        },

        handleFileCheck(files) {
            const checkedFiles = files.filter((file) => {
                return this.checkFileSize(file) && this.checkFileType(file);
            });

            if (checkedFiles.length === 0) {
                return;
            }

            if (this.useFileData) {
                this.preview = !this.multiSelect ? checkedFiles[0] : null;
                this.$emit('media-upload-add-file', checkedFiles);
            } else {
                this.handleUpload(checkedFiles);
            }
        },
    },
});
