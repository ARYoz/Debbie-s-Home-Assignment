package Tagil07.ArtSystem;

public class Tree extends Element {

    int leavesAmount;

    public int getLeavesAmount() {
        return leavesAmount;
    }

    public Tree(double width, double height, int leavesAmount, String path) {
        super(width, height, path);
        this.leavesAmount = leavesAmount;
    }

    // Area = (width/2 * length) + (width * length)/2
    public double getArea() {
        double trunkArea = (getWidth() / 2.0) * getLength();
        double leavesArea = (getWidth() * getLength()) / 2.0;
        return trunkArea + leavesArea;
    }

    @Override
    public String getName() {
        return "tree";
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

