package ArtSystem;


public class Boat extends Element{
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
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }


    @Override
    public double getArea() {
        double rectangleArea = width * length;
        double radius = width / 2.0;
        double halfCircleArea = (Math.PI * radius * radius) / 2.0;
        return rectangleArea + halfCircleArea;
    }
}
