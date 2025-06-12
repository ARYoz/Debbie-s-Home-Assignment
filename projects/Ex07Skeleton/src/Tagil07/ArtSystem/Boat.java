package Tagil07.ArtSystem;

public class Boat extends Element {
    Material material;
    public Boat(double width, double length, Material m, String path) {
        super(width, length, path);
        this.material=m;
    }

    public Material getMaterial() {
        return material;
    }

    public String getName() {
        return "boat";
    }

    @Override
    public Habitat getHabitat() {
        return Habitat.AQUATIC;
    }

    @Override
    public void accept(ElementVisitor visitor) {
        visitor.visit(this);
    }

    // Area = rectangle + half circle
    public double getArea() {
        double rectArea = getWidth() * getLength();
        double halfCircleArea = (Math.PI * Math.pow(getWidth() / 2.0, 2)) / 2.0;
        return rectArea + halfCircleArea;
    }


}
