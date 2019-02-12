import React from "react";
// import InputField from "../../../InputField";
// import HelpIcon from "../../../HelpIcon";

class VehicleVINWrapper {
    getValue() {
        const value =
            this._parent.props.vehicleInfo && this._parent.props.vehicleInfo.Vin
                ? this._parent.props.vehicleInfo.Vin
                : "";
        return value;
    }

    _getInputOptions() {
        this._value = this.getValue();
        const inputProps = {
            id: this._options.identifier,
            ref: this._options.identifier,
            name: this._options.identifier,
            placeholder: this._options.fieldLabel,
            maxLength: this._options.fieldLength
                ? this._options.fieldLength
                : "",
            category: this._options.category,
            value: "",
            errorMessage: this._options.validationMessage,
            requiredMessage:
                this._options.requiredMessage || "This Field is Required.",
            isValid: this._parent.props[`isValid${this._options.identifier}`],
            validOnlyOnBlur: true,
            regex: this._options.validationPattern,
            needInsight: true
        };

        inputProps.value = this._value;
        inputProps.inputClassName = this._parent.props.lockState
            ? "txtVin disabled"
            : "txtVin";
        inputProps.isValid = this._parent.props.isValidVin;
        inputProps.disabled = !!this._parent.props.lockState;
        inputProps.onChange = this._parent.handleVinOnChange.bind(this._parent);
        inputProps.useParentError = true;
        if (this._parent.props.vinNotFound) {
            inputProps.errorMessage =
                "Your vehicle cannot be found.  Please verify the VIN.";
        } else if (this._parent.props.isDuplicateVin) {
            inputProps.errorMessage =
                "This VIN already exists. Please enter another VIN.";
        } else if (
            !(
                this._parent.props.vehicleInfo &&
                this._parent.props.vehicleInfo.Vin
            )
        ) {
            inputProps.errorMessage = "This field is required.";
        } else {
            inputProps.errorMessage = "Please enter a valid 17-digit VIN.";
        }

        return inputProps;
    }

    render() {
        if (!this.isVisible()) {
            return <div />;
        }
        const props = this._getInputOptions();
        return (
            <div
                id={props.id}
                key={props.id}
                className="mdl-cell mdl-cell--4-col-phone mdl-cell--3-col-tablet mdl-cell--5-col-desktop mdl-cell--middle text-center"
                data-di-mask=""
            >
                <p>VIN Number </p>
                {/* {this._options.tooltip ? (
                    <HelpIcon content={this._options.tooltip} />
                ) : (
                    ""
                )} */}
                {/* <InputField {...props} /> */}
            </div>
        );
    }
}

module.exports = VehicleVINWrapper;
