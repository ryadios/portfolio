import { Card, CardHeader, CardTitle } from "../ui/card";

export function AboutMe({ key }: { key: string }) {
    return (
        <Card key={key} data-grid={{ w: 2, h: 1, x: 0, y: 0 }}>
            <CardHeader>
                <CardTitle>{key}</CardTitle>
            </CardHeader>
        </Card>
    );
}
