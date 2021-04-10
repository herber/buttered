import React from 'react';
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
            _ctx.p = _props;

            // Set a flag if the current components had a previous className
            // similar to goober. This is the append/prepend flag
            // The _empty_ space compresses better than `\s`
            _ctx.o = / *butter_\d+/g.test(_previousClassName);

            _props.className =
                css.apply(_ctx, _args) + (_previousClassName ? ' ' + _previousClassName : '');

            // If the forwardRef fun is defined we have the ref
            _props.ref = ref;

            // Let the closure do the capture, cause it might get removed in the fwdProp
            let _as = _props.as || tag;

            /*// Handle the forward props filter if defined and _as is a string
            if (fwdProp && _as[0]) {
                fwdProp(_props);
            }*/

            return React.createElement(_as, _props);
        }

        return React.forwardRef(Styled);
    };
}

export { styled };
