import type {ButtonEvent, MenuButtonDefn, MenuHandler} from "./MenuTypes.ts";
import * as React from "react";
import {Button} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export function MenuComponent({defn, handler}: { defn: MenuButtonDefn, handler: MenuHandler }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleItemClick = (
        _event: ButtonEvent,
        name: string) => {
        setAnchorEl(null);
        handler(name);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            {defn.label}
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
            }}
        >
            {defn.items.map((item) => (
                <MenuItem
                    key={item.name}
                    onClick={(event: ButtonEvent) =>
                        handleItemClick(event, `${defn.name}/${item.name}`)}>
                    {item.label}
                </MenuItem>))
            }
        </Menu>
    </>;
}