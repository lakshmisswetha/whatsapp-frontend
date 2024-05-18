declare module "*.jsx" {
    import React from "react";
    const component: React.FC<{ className?: string }>;
    export default component;
}
