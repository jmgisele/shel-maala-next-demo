export interface NavbarProps {
    navigation: {
        items: { text: string; url: string; [key: string]: any }[];
    }
}
