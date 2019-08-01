import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `dmp-number-input`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DmpNumberInput extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        :host([inline]) .ctn{
          display: flex;
        }
        * {
          box-sizing: border-box;
          box-shadow: 0 0 0 1px black;
        }
        .input_container{
          display: flex;
        }
        input {
          width: 40px;
          border-radius: 4px;
          border: 2px solid var(--dmp_number_input_border, var(--primary_color, grey));
          background: var(--dmp_number_input_background, var(--primary_color, white));
          text-align: center;
          margin: 0 10px;

        }
        .handler {
          width: 30px;
          height: 30px;
          background: var(--dmp_number_input_btn_color, var(--primary_color, grey));
          color: var(--dmp_number_input_text_color , var(--secundary_color, white));
          font-size: 23px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 4px;
          border: 0;
          cursor: pointer;
        }

        label{
          /*width: calc(100% - 140px);*/
          border: 1px solid red;
        }
        :host([inline]) .label_wrapper{
          display: flex;
          justify-content: left;
          align-items: center;
        }


      </style>
      <div class="ctn">
        <template is="dom-if" if="[[label]]">
          <div style$="width: calc(100% - [[_fixWidth]])" class="label_wrapper">
            <label>[[label]]</label>
          </div>
        </template>

        <div class="input_container" id="inputContainer">
          <button class="handler" on-click="substract">-</button>
          <input max="[[max]]" min="[[min]]" class="input" type="number" pattern="[[pattern]]" inputmode="numeric" value="{{value::change}}"/>
          <button class="handler" on-click="add">+</button>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      value: {
        type: Number,
        value: 10
      },
      step: {
        type: Number,
        value: 1
      },
      min: { type: Number },
      max: { type: Number },
      label: { type: String },
      pattern: { type: String },
      _fixWidth: { type: Number }
    };
  }

  ready() {
    super.ready();
    if ( this.inline ){
      this._fixWidth = window.getComputedStyle(this.$.inputContainer).width;
    }
  }

  add() {
    const newVal = Number(this.value) + this.step;
    if (!this.max || newVal < this.max ){
      this.value = newVal;
    }
  }
  
  substract() {
    const newVal = Number(this.value) - this.step;
    if (!this.min || newVal > this.min ){
      this.value = newVal;
    }
  }

  validate() {
    const results = [];
    results.push(this._validateRequired(this.required));
    results.push(this._validateMin(this.min));
    results.push(this._validateMax(this.max));
    this.isValid =  !results.includes(false);
    return this.isValid;
  }

  _validateRequired(required) {
    if (required){
      return !!this.value;
    }else{
      return true;
    }
  }

  _validateMax(max) {
    if (max){
      return this.value < max;
    }else{
      return true;
    }
  }

  _validateMin(min) {
    if (min){
      return this.value > min;
    }else{
      return true;
    }
  }
}
// poner que el valor a mano valide tambien
window.customElements.define('dmp-number-input', DmpNumberInput);


