import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { css } from './css';

/**
 * styled function
 * @param {string} tag
 */
function styled(tag) {
    let _ctx = this || {};

    return function wrapper() {
        let _args = arguments;

        function Styled(props, ref) {
            // Grab a shallow copy of the props
            let _props = Object.assign({}, props);

            // Keep a local reference to the previous className
            let _previousClassName = _props.className || Styled.className;

            // _ctx.p: is the props sent to the context
            _ctx.p = Object.assign({}, _props);

            // Set a flag if the current components had a previous className
            // similar to goober. This is the append/prepend flag
            // The _empty_ space compresses better than `\s`
            _ctx.o = / *bt_\d+/g.test(_previousClassName);

            _props.className =
                css.apply(_ctx, _args) + (_previousClassName ? ' ' + _previousClassName : '');

            // If the forwardRef fun is defined we have the ref
            _props.ref = ref;

            // Let the closure do the capture, cause it might get removed in the fwdProp
            let _as = _props.as || tag;

            for (let prop in _props) {
                if (!isPropValid(prop)) {
                    delete _props[prop];
                }
            }

            return React.createElement(_as, _props);
        }

        return React.forwardRef(Styled);
    };
}

export { styled };
