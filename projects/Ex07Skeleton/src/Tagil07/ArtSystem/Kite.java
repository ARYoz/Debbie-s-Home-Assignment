package Tagil07.ArtSystem;

import java.util.List;

public class Kite extends Element {
    Color color;

    public Kite(double width, double height, Color color, String path) {
        super(width, height, path);
        this.color = color;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    // Area = (width * length) / 2 (rhombus)
    public double getArea() {
        return (getWidth() * getLength()) / 2.0;
    }

    @Override
    public String getName() {
        return "kite";
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.TERRESTRIAL;
    }

    @Override
    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
    }
}
