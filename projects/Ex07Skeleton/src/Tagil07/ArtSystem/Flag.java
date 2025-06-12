package Tagil07.ArtSystem;


import java.util.List;

public class Flag extends Element {

    Color color;
    int carrierHeight;

    public Flag(double width, double length, Color color, int carrierHeight, String path) {
        super(width, length, path);
        this.color = color;
        this.carrierHeight = carrierHeight;
    }


    public Color getColor() {
        return color;
    }

    public int getCarrierHeight() {
        return carrierHeight;
    }

    // Area = width * length (rectangle)
    public double getArea() {
        return getWidth() * getLength();
    }

    @Override
    public String getName() {
        return Flag.class.getSimpleName().toLowerCase();
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.AMPHIBIAN;
    }

    @Override
    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
    }

}

