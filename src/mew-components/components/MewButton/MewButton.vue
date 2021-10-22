<template>
  <!--
  =====================================================================================
    Mew Button
  =====================================================================================
  -->
  <v-btn
    :target="btnLink ? '_blank' : ''"
    :href="btnLink"
    :ripple="rippleColor ? { class: `${rippleColor}--text` } : !isTransparent"
    :class="[getClasses(), 'mew-button', `${textColor}--text`]"
    :color="btnColor ? btnColor : colorTheme"
    :disabled="disabled"
    depressed
    :outlined="isOutline"
    :text="isTransparent"
    :style="hoverColor ? hoverColorStyle : ''"
    @click="onBtnClick"
  >
    <!--
    =====================================================================================
      Loading state
    =====================================================================================
    -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      size="25"
      :color="isTransparent || isOutline ? 'primary' : 'white'"
    />
    <!--
    =====================================================================================
      Loaded Button Content 
    =====================================================================================
    -->
    <div v-if="!loading" class="d-flex justify-center align-center">
      <!--
      =====================================================================================
        Img content - uses img src (Left)
      =====================================================================================
      -->
      <img
        v-if="showIcon('img') && !showIconAlignRight"
        class="icon mr-1"
        :src="icon"
        alt="icon"
      />
      <!--
      =====================================================================================
      V-Icon Content - uses material design icons (Left)
      =====================================================================================
      -->
      <v-icon v-if="showIcon('mdi') && !showIconAlignRight" class="icon mr-1">
        {{ icon }}
      </v-icon>
      <!--
      =====================================================================================
      Mew Icon Content - uses mew icons (Left)
      =====================================================================================
      -->
      <mew-icon
        v-if="showIcon('mew') && !showIconAlignRight"
        :img-height="30"
        class="icon mr-1"
        :icon-name="icon"
      />
      <!--
      =====================================================================================
      Button text
      =====================================================================================
      -->
      <span>{{ title }}</span>
      <!--
      =====================================================================================
        Img content - uses img src (Right)
      =====================================================================================
      -->
      <img
        v-if="showIcon('img') && showIconAlignRight"
        class="icon ml-1"
        :src="icon"
        alt="icon"
      />
      <!--
      =====================================================================================
      V-Icon Content - uses material design icons (Right)
      =====================================================================================
      -->
      <v-icon v-if="showIcon('mdi') && showIconAlignRight" class="icon mr-1">
        {{ icon }}
      </v-icon>
      <!--
      =====================================================================================
      Mew Icon Content - uses mew icons (Right)
      =====================================================================================
      -->
      <mew-icon
        v-if="showIcon('mew') && showIconAlignRight"
        :img-height="30"
        class="icon mr-1"
        :icon-name="icon"
      />
    </div>
  </v-btn>
</template>

<script>
//import MewIcon from '../MewIcon/MewIcon.vue';

export default {
  name: 'MewButton',
  components: {
    //MewIcon
  },
  props: {
    /**
     * Enables loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Button size: small, medium, large, xlarge.
     */
    btnSize: {
      type: String,
      default: 'large'
    },
    /**
     * Sets the button to have 100% width.
     */
    hasFullWidth: {
      type: Boolean,
      default: false
    },
    /**
     * The text that will go in the button.
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * The icon url. Inserts an icon next to the button title.
     */
    icon: {
      type: [String, Array],
      default: ''
    },
    /**
     * Aligns the icon: left, right, or none.
     */
    iconAlign: {
      type: String,
      default: 'none'
    },
    /**
     * The type of icon: mew, mdi, or img
     */
    iconType: {
      type: String,
      default: 'mew'
    },
    /**
     * Applies the button color theme: basic, primary, error, white, or secondary.
     */
    colorTheme: {
      type: String,
      default: 'primary'
    },
    /**
     * Applies the button style: background, transparent, or outline.
     */
    btnStyle: {
      type: String,
      default: 'background'
    },
    /**
     * Removes the ability to click or target the component.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Opens up a new page with the link.
     */
    btnLink: {
      type: String,
      default: ''
    },
    /**
     * Displays the buttons' active state.
     */
    showsActiveState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnColor: '',
      textColor: '',
      hoverColor: '',
      rippleColor: '',
      btnStyles: {
        background: 'background',
        transparent: 'transparent',
        outline: 'outline'
      },
      colorThemes: {
        white: 'white',
        primary: 'primary'
      },
      iconAlignments: {
        left: 'left',
        right: 'right'
      },
      iconTypes: {
        mew: 'mew',
        mdi: 'mdi',
        img: 'img'
      },
      active: false
    };
  },
  computed: {
    isTransparent() {
      return this.btnStyle.toLowerCase() === this.btnStyles.transparent;
    },
    isOutline() {
      return this.btnStyle.toLowerCase() === this.btnStyles.outline;
    },
    isBackground() {
      return this.btnStyle.toLowerCase() === this.btnStyles.background;
    },
    isPlain() {
      return this.colorTheme.toLowerCase() === this.colorThemes.white;
    },
    showIconAlignRight() {
      return this.iconAlign.toLowerCase() === this.iconAlignments.right;
    },
    hoverColorStyle() {
      // If hoverColor is set, create a css variable
      return {
        '--hover-color': this.hoverColor
      };
    }
  },
  methods: {
    showIcon(val) {
      return (
        this.iconType.toLowerCase() === this.iconTypes[val] &&
        this.hasSrc(this.icon)
      );
    },
    onBtnClick() {
      this.active = !this.active;
    },
    getClasses() {
      const classes = [];

      // Set text, hover, ripple color for color themes
      switch (this.colorTheme) {
        // =======================================
        // Theme: Basic
        // =======================================
        case 'basic':
          this.btnColor = 'greyPrimary';
          this.textColor = '';
          this.hoverColor = '';
          this.rippleColor = '';
          break;

        case 'basic-light':
          this.btnColor = 'greyLight';
          this.textColor = 'textMedium';
          this.hoverColor = 'black';
          this.rippleColor = '';
          break;

        case 'basic-outline':
          this.btnColor = '';
          this.textColor = 'textMedium';
          this.hoverColor = 'black';
          this.rippleColor = '';
          classes.push('btn-basic-outline');
          break;

        case 'basic-transparent':
          this.btnColor = 'transparent';
          this.textColor = 'textMedium';
          this.hoverColor = 'black';
          this.rippleColor = '';
          //classes.push('btn-basic-transparent');
          break;

        // =======================================
        // Theme: Secondary
        // =======================================
        case 'secondary':
          this.btnColor = 'bluePrimary';
          this.textColor = '';
          this.hoverColor = '';
          this.rippleColor = '';
          break;

        case 'secondary-light':
          this.btnColor = '#f1f5fe';
          this.textColor = 'bluePrimary';
          this.hoverColor = 'blue';
          this.rippleColor = 'blue';
          break;

        case 'secondary-outline':
          this.btnColor = '';
          this.textColor = 'bluePrimary';
          this.hoverColor = 'blue';
          this.rippleColor = 'blue';
          classes.push('btn-secondary-outline');
          break;

        case 'secondary-transparent':
          this.btnColor = '';
          this.textColor = 'bluePrimary';
          this.hoverColor = 'blue';
          this.rippleColor = 'blue';
          classes.push('btn-secondary-transparent');
          break;

        // =======================================
        // Theme: Primary
        // =======================================
        case 'primary':
          this.btnColor = 'primary';
          this.textColor = '';
          this.hoverColor = '';
          this.rippleColor = '';
          break;

        case 'primary-light':
          this.btnColor = 'superPrimary';
          this.textColor = 'primary';
          this.hoverColor = '#19ffde';
          this.rippleColor = '#19ffde';
          break;

        case 'primary-outline':
          this.btnColor = '';
          this.textColor = 'primary';
          this.hoverColor = '#19ffde';
          this.rippleColor = '#19ffde';
          classes.push('btn-primary-outline');
          break;

        case 'primary-transparent':
          this.btnColor = '';
          this.textColor = 'primary';
          this.hoverColor = '#19ffde';
          this.rippleColor = '#19ffde';
          classes.push('btn-primary-transparent');
          break;

        // =======================================
        // Theme: Error
        // =======================================
        case 'error':
          this.btnColor = 'error';
          this.textColor = '';
          this.hoverColor = '';
          this.rippleColor = '';
          break;

        case 'error-light':
          this.btnColor = 'redLight';
          this.textColor = 'error';
          this.hoverColor = '';
          this.rippleColor = '';
          break;

        case 'error-outline':
          this.btnColor = '';
          this.textColor = 'error';
          this.hoverColor = '#19ffde';
          this.rippleColor = '#19ffde';
          classes.push('btn-error-outline');
          break;

        case 'error-transparent':
          this.btnColor = '';
          this.textColor = 'error';
          this.hoverColor = '#19ffde';
          this.rippleColor = '#19ffde';
          classes.push('btn-error-transparent');
          break;

        // =======================================
        // Theme: disabled
        // =======================================
        case 'disable':
          this.btnColor = 'disabledMedium';
          this.textColor = 'white';
          this.hoverColor = '';
          this.rippleColor = '';
          classes.push('btn-disable');
          break;

        case 'disable-light':
          this.btnColor = 'disabledLight';
          this.textColor = 'disabledPrimary';
          this.hoverColor = '';
          this.rippleColor = '';
          classes.push('btn-disable-light');
          break;

        case 'disable-outline':
          this.btnColor = '';
          this.textColor = 'disabledPrimary';
          this.hoverColor = '';
          this.rippleColor = '';
          classes.push('btn-disable-outline');
          break;

        case 'disable-transparent':
          this.btnColor = '';
          this.textColor = 'disabledPrimary';
          this.hoverColor = '';
          this.rippleColor = '';
          classes.push('btn-disabled-transparent');
          break;

        default:
      }

      if (this.btnSize.toLowerCase()) {
        classes.push(this.btnSize.toLowerCase() + '-btn');
      }

      if (this.hasFullWidth === true) {
        classes.push('full-width');
      }

      if (this.isBackground && !this.isPlain && !this.textColor) {
        classes.push('white--text');
      }

      if (this.isBackground && this.isPlain) {
        classes.push('primary--text');
      }

      if (this.active && !this.disabled && this.showsActiveState) {
        classes.push('active');
      }

      if (
        this.active &&
        this.showsActiveState &&
        !this.disabled &&
        this.isOutline
      ) {
        classes.push('bg-white');
      }

      if (this.isTransparent) {
        classes.push('mew-transparent');
      }
      return classes;
    },
    hasSrc(src) {
      if (src === '' || src.length <= 0) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-application {
  .v-btn {
    border-radius: 6px !important;

    .icon {
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 45px;
    }

    // button sizes
    &.small-btn {
      min-height: 28px;
      padding: 0 15px;
    }

    &.medium-btn {
      min-height: 34x;
      padding: 0 20px;
    }

    &.large-btn {
      min-height: 46px;
      padding: 0 32px;
    }

    &.xlarge-btn {
      min-height: 62px;
      padding: 0 46px;
    }

    // disabled btn
    &.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: var(--v-disabled-base) !important;
      color: var(--v-white-base) !important;
    }

    &.v-btn--disabled.v-btn--has-bg {
      .v-icon {
        color: var(--v-white-base) !important;
      }
    }

    &.mew-transparent {
      &:before {
        background-color: transparent;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// If hoverColor is set, use css variable to set hover color
// otherwise use default hover color
.v-btn::before {
  background-color: var(--hover-color, currentColor);
}

// btn-basic
.btn-basic-outline {
  border: 1px solid var(--v-greyMedium-base) !important;
  background-color: transparent !important;
}
.btn-basic-transparent {
  background-color: transparent !important;
}

// btn-secondary
.btn-secondary-outline {
  border: 1px solid var(--v-blueMedium-base) !important;
  background-color: transparent !important;
}
.btn-secondary-transparent {
  background-color: transparent !important;
}

// btn-primary
.btn-primary-outline {
  border: 1px solid var(--v-primary-base) !important;
  background-color: transparent !important;
}
.btn-primary-transparent {
  background-color: transparent !important;
}

// btn-error
.btn-error-outline {
  border: 1px solid var(--v-redMedium-base) !important;
  background-color: transparent !important;
}
.btn-error-transparent {
  background-color: transparent !important;
}

// btn-disable
.btn-disable {
  pointer-events: none;
}
.btn-disable-light {
  pointer-events: none;
}
.btn-disable-outline {
  pointer-events: none;
  border: 1px solid var(--v-disabledPrimary-base) !important;
  background-color: transparent !important;
}
.btn-disabled-transparent {
  pointer-events: none;
  background-color: transparent !important;
}
</style>
